// ============================================================
//  ROBOCON SCOREBOARD: SETTINGS
//  Connected to the Firebase project "robocon-tips".
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBrVbC0oksTQhHz5bzghkYkDwl93ZV1xn4",
  authDomain: "robocon-tips.firebaseapp.com",
  projectId: "robocon-tips",
  storageBucket: "robocon-tips.firebasestorage.app",
  messagingSenderId: "356812922339",
  appId: "1:356812922339:web:e83458a15dc78f735094d6"
};

// Owners: always admins, and the only ones who can add or remove other admins
// (from the "Manage admins" section of the admin panel).
// Keep this list the same as the one in firestore.rules.
window.OWNER_EMAILS = [
  "ajay21022010@gmail.com",
  "ej15132@tipsglobeducate.com"
];
