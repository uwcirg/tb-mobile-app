importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

const isLocalhost = Boolean(
  self.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    self.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    self.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const baseURL = (isLocalhost) ? "http://localhost:3000" : "https://tb-mobile-test.cirg.washington.edu";
const apiURL = (isLocalhost) ? "http://localhost:5061" : "https://tb-api-test.cirg.washington.edu";

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.(?:js|css|json|html)$/,
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  `${baseURL}`,
  workbox.strategies.networkFirst()
)

self.addEventListener('push', function(event) {

 let data = event.data.json();
  
  const title = data.title;
  const options = {
    body: data.body,
    icon: data.icon,
    badge: 'images/badge.png',
    url: data.url,
    click_action: data.url
  };
  

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint);
      return fetch(`https://tb-api-test.cirg.washington.edu/update_user_subscription`, {
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

self.addEventListener('notificationclick', function(event) {

  const examplePage = '/';

  const urlToOpen = new URL(examplePage, self.location.origin).href;

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    let matchingClient = null;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient;
        break;
      }
    }

    if (matchingClient) {
      return matchingClient.focus();
    } else {
      return clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(promiseChain);

});

