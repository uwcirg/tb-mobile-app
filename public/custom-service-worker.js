importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ debug: false });

const { precacheAndRoute } = workbox.precaching//
const createHandlerBoundToURL = workbox.precaching.createHandlerBoundToURL
const { NavigationRoute, registerRoute } = workbox.routing
const { NetworkFirst } = workbox.strategies

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

//Edit this to refresh the service worker


//Loads variable named react_env
importScripts('./config.js');

const baseURL = react_env.URL_CLIENT;
const apiURL = react_env.URL_API;

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// workbox.precaching.precacheAndRoute([
//   {url: '/index.html', revision: '383676' }
// ]);

// workbox.routing.registerRoute(
//   /\.(?:js|css)$/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: "static-resources",
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
//       }),
//     ],
//   })
// );

try {

  workbox.routing.registerRoute(
    /\.(?:js|css|json|html)$/,
    new NetworkFirst()
  )

  workbox.routing.registerRoute(
    `${baseURL}`,
    new NetworkFirst()
  )

  workbox.routing.registerRoute('/logo.png', new NetworkFirst())
  workbox.routing.registerRoute('/config.js', new NetworkFirst())

  // This assumes /app-shell.html has been precached.
  const handler = createHandlerBoundToURL('/index.html');
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);

  
} catch (error) {
  console.log("Error Caught - Offline Precaching will not work in CRA development mode. Edit gain  ")
}

//Non-Workbox stuff (WebPush handlers, ect.)

self.addEventListener('push', function (event) {

  let data = event.data.json();

  if (data.data.type && data.data.type == "messaging" && isBroadcastChannelSupported()) {
    //Send a message to the client to route to the proper state
    const channel = new BroadcastChannel('messaging-notification');
    channel.postMessage("update");
  }

  const title = data.title;
  const options = {
    body: data.body,
    icon: data.icon,
    badge: 'images/badge.png',
    url: data.url,
    click_action: data.url,
    data: data.data.url
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('notificationclick', function (event) {

  const promiseChain = clients.matchAll().then((windowClients) => {
    let matchingClient = null;

    if (windowClients.length > 0) {
      matchingClient = windowClients[0]
    }

    if (matchingClient) {

      if (isBroadcastChannelSupported()) {
        //Send a message to the client to route to the proper state
        const channel = new BroadcastChannel('notifications');
        channel.postMessage({ url: event.notification.data });
      }

      //matchingClient.postMessage({msg: 'Hello from SW'})
      event.notification.close();
      return matchingClient.focus();
    } else {

      //If the app / a tab of it is not open, then open it to the UI state
      event.notification.close();
      return clients.openWindow(event.notification.data);
    }

  });

  event.waitUntil(promiseChain);

});

self.addEventListener('pushsubscriptionchange', function (event) {

  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
      .then(function (subscription) {
        console.log('Subscribed after expiration', subscription.endpoint);
        return fetch(`${baseURL}/update_user_subscription`, {
          method: 'patch',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            uuid: userID,
            endpoint: subscription.endpoint,
            auth: subscription.keys.auth,
            p256dh: subscription.keys.p256dh
          })
        });
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }else if(event.data && event.data.type === 'CHECK_WAITING'){
    console.log("Check waiting message recieved")
  }
});


function isBroadcastChannelSupported() {
  if (!("BroadcastChannel" in self)) {
    return false;
  }

  // When running in a sandboxed iframe, the BroadcastChannel API
  // is not actually available and throws an exception
  try {
    const channel = new BroadcastChannel("feature_test");
    channel.close();
    return true;
  } catch (err) {
    return false;
  }
}


function invokeServiceWorkerUpdateFlow(registration) {
  // TODO implement your own UI notification element
  notification.show("New version of the app is available. Refresh now?");
  notification.addEventListener('click', () => {
      if (registration.waiting) {
          // let waiting Service Worker know it should became active
          registration.waiting.postMessage('skip waiting')
      }
  })
}


