// ============================================================
//  FIREBASE SETUP — fill in your config below!
//
//  Steps:
//  1. Go to https://console.firebase.google.com
//  2. Click "Add project" → name it "tuesday-game"
//  3. Disable Google Analytics if asked (not needed) → Create project
//  4. Click "Build" → "Realtime Database" → "Create database"
//  5. Choose "Start in test mode" → Enable
//  6. Go to Project Settings (gear icon) → "Your apps" → click </>
//  7. Register app (any nickname) → copy the firebaseConfig object
//  8. Paste the values below replacing each "YOUR_..." placeholder
//
//  That's it! The game will work for 30 days in test mode.
//  (Extend rules at any time in the Firebase console)
// ============================================================

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:       "YOUR_DATABASE_URL",   // ends in .firebasedatabase.app
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
