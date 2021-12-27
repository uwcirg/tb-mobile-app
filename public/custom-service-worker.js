importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
importScripts('./config.js');

workbox.setConfig({ debug: false });

const { precacheAndRoute } = workbox.precaching//
const createHandlerBoundToURL = workbox.precaching.createHandlerBoundToURL
const { NavigationRoute, registerRoute } = workbox.routing
const { NetworkFirst } = workbox.strategies

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

//Edit this to refresh the service worker
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

try {

  workbox.routing.registerRoute('/logo.png', new NetworkFirst())

  // This assumes /app-shell.html has been precached.
  const handler = createHandlerBoundToURL('/index.html');
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);

} catch (error) {
  console.log("Error Caught - Offline Precaching will not work in CRA development mode. Edit to test  ")
}

//Non-Workbox stuff (WebPush handlers, ect.)
self.addEventListener('push', function (event) {
  const json = event.data.json();
  logNotificationDelivery(json.data.id);

  if (json.data.type && json.data.type == "Messaging" && isBroadcastChannelSupported()) {
    //Send a message to the client to route to the proper state
    const channel = new BroadcastChannel('messaging-notification');
    channel.postMessage({ url: json.data.url });
  }

  let options = {
    body: json.body,
    icon: 'logo.png',
    badge: 'push-badge.png',
    url: json.url,
    click_action: json.url,
    data: json.data
  };

  if(json.actions){
      options.actions = json.actions
  }

  event.waitUntil(self.registration.showNotification(json.title, options));
});

self.addEventListener('notificationclick', function (event) {
  logNotificationClick(event.notification.data.id);

  let redirectURL = event.notification.data.url;

  if (event.notification.data.type === "MedicationReminder") {
    if (event.action === "good") {
      redirectURL = "/quick-report?noIssues=true"
    } else if (event.action === "issue") {
      redirectURL = "/quick-report?issues=true"
    }
  }

  const promiseChain = clients.matchAll().then((windowClients) => {
    let matchingClient = null;

    if (windowClients.length > 0) {
      matchingClient = windowClients[0]
    }

    if (matchingClient) {

      if (isBroadcastChannelSupported()) {
        //Send a message to the client to route to the proper state
        const channel = new BroadcastChannel('notifications');
        channel.postMessage({ action: event.action, url: redirectURL, type: event.notification.type });
      }

      event.notification.close();
      return matchingClient.focus();
    } else {

      //If the app / a tab of it is not open, then open it to the UI state
      event.notification.close();
      return clients.openWindow(redirectURL).then(function (client) { client.focus(); });
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
  } else if (event.data && event.data.type === 'CHECK_WAITING') {
    console.log("Check waiting message recieved")
  }
});

function isBroadcastChannelSupported() {
  if (!("BroadcastChannel" in self)) {
    return false;
  }

  try {
    const channel = new BroadcastChannel("feature_test");
    channel.close();
    return true;
  } catch (err) {
    return false;
  }
}

function invokeServiceWorkerUpdateFlow(registration) {
  notification.show("New version of the app is available. Refresh now?");
  notification.addEventListener('click', () => {
    if (registration.waiting) {
      // let waiting Service Worker know it should became active
      registration.waiting.postMessage('skip waiting')
    }
  })
}

function logNotificationDelivery(notificationId) {
  callAnalyticsAPI(notificationId, { deliveredSuccessfully: true, deliveredAt: getCurrentISODateTime() })
}

function logNotificationClick(notificationId) {
  callAnalyticsAPI(notificationId, { clicked: true, clickedAt: getCurrentISODateTime() })
}

function callAnalyticsAPI(notificationId, body) {
  const url = `${react_env.URL_API}/v2/push_notification_status/${notificationId}`
  fetch(url, {
    method: "PATCH", body: JSON.stringify(body), credentials: "include", headers: {
      "Content-Type": "application/json"
    }
  })
}

function getCurrentISODateTime() {
  const datetime = new Date();
  return datetime.toISOString();
}



