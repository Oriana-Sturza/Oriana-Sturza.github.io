// Firebase config for The 1% of Tuesday Club
const firebaseConfig = {
  apiKey:            "AIzaSyCGBOhq4DYEIXn982RF-ZlHs5KAOR-T1us",
  authDomain:        "tuesday-game-5a38c.firebaseapp.com",
  databaseURL:       "https://tuesday-game-5a38c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "tuesday-game-5a38c",
  storageBucket:     "tuesday-game-5a38c.firebasestorage.app",
  messagingSenderId: "776278448672",
  appId:             "1:776278448672:web:282952cba5d234034ffa45"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
