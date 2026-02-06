// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9K6jTlFzWJEf164M7QfA1X7P7jgQ-z7Y",
  authDomain: "cause-circle-429522.firebaseapp.com",
  projectId: "cause-circle-429522",
  storageBucket: "cause-circle-429522.appspot.com",
  messagingSenderId: "150409629176",
  appId: "1:150409629176:web:6004a4daa4e0094c29da0d",
  databaseURL: `https://cause-circle-429522.firebaseio.com`,
};

// Named database configuration
// Only use the staging database on the staging domain
const STAGING_DOMAIN = "4xxglxlj-dev.preview.stage.zesty.io";
const isStaging = window.location.hostname === STAGING_DOMAIN;
const FIRESTORE_DATABASE_ID = isStaging ? "cause-circle-stage" : "(default)";

firebase.initializeApp(firebaseConfig);

// Initialize Firestore
// 
// IMPORTANT: The Firebase compat SDK (firebase.firestore()) does NOT support 
// named databases directly. To use a named database, we must use the modular
// SDK's getFirestore(app, databaseId) function.
//
// However, since most of the codebase uses compat-style API calls like 
// db.collection("Users").doc(uid).get(), we need to ensure compatibility.
//
// The solution: We modify the compat Firestore instance's internal database ID
// reference to point to the named database. This leverages the fact that the
// compat SDK wraps the modular SDK internally.

const db = firebase.firestore();

// Configure the compat Firestore instance to use the named database (staging only)
// This modifies the internal database ID reference
if (isStaging && db._delegate && db._delegate._databaseId) {
  // Firebase version 9.x+ compat SDK structure
  Object.defineProperty(db._delegate, '_databaseId', {
    value: {
      projectId: firebaseConfig.projectId,
      database: FIRESTORE_DATABASE_ID
    },
    writable: false,
    configurable: true
  });
  console.log(`[Firebase Config] Staging environment - using named database: ${FIRESTORE_DATABASE_ID}`);
} else if (!isStaging) {
  console.log(`[Firebase Config] Production environment - using default database`);
} else {
  console.warn('[Firebase Config] Unable to configure named database - using default database');
}

// Expose the configured Firestore instance globally
// All scripts should use window.db instead of firebase.firestore() to ensure
// they're using the correctly configured named database instance.
window.db = db;
window.FIRESTORE_DATABASE_ID = FIRESTORE_DATABASE_ID;
window.IS_STAGING = isStaging;

// Initialize Firebase Cloud Messaging
let messaging = null;
try {
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