// Firebase Cloud Messaging Service Worker
// This file must be placed in the root directory of your web app

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize Firebase in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyD9K6jTlFzWJEf164M7QfA1X7P7jgQ-z7Y",
  authDomain: "cause-circle-429522.firebaseapp.com",
  projectId: "cause-circle-429522",
  storageBucket: "cause-circle-429522.appspot.com",
  messagingSenderId: "150409629176",
  appId: "1:150409629176:web:6004a4daa4e0094c29da0d",
  databaseURL: "https://cause-circle-429522.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification?.title || 'CauseCircle';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: payload.data?.tag || 'causecircle-notification',
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/favicon.ico'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received.');
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
