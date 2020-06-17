importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

//Loads variable named react_env
importScripts('./config.js');
const baseURL = react_env.URL_CLIENT;
const apiURL = react_env.URL_API;

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.setConfig({ debug: false });

workbox.routing.registerRoute(
  /\.(?:js|css|json|html)$/,
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  `${baseURL}`,
  workbox.strategies.networkFirst()
)

self.addEventListener('push', function (event) {

  let data = event.data.json();

  if(data.data.type && data.data.type == "messaging" && isBroadcastChannelSupported()){
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

      if(isBroadcastChannelSupported()){
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
  } catch(err) {
      return false;
  }
}


