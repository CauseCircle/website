const firebaseConfig = {
  apiKey: "AIzaSyD9K6jTlFzWJEf164M7QfA1X7P7jgQ-z7Y",
  authDomain: "cause-circle-429522.firebaseapp.com",
  projectId: "cause-circle-429522",
  storageBucket: "cause-circle-429522.appspot.com",
  messagingSenderId: "150409629176",
  appId: "1:150409629176:web:6004a4daa4e0094c29da0d",
  databaseURL: `https://cause-circle-429522.firebaseio.com`,
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
let messaging = null;
try{
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    
    // Configure the service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('{{$base_url}}/auth/firebase-messaging-sw.js?zpw=causecircle')
        .then((registration) => {
          messaging.useServiceWorker(registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
}catch(error){
  
}


// Make messaging available globally
window.firebaseMessaging = messaging;