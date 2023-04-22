import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `AIzaSyCELzNt35SRb8fLEFgjpnTzpEbq7afHylk`,
  authDomain: "auth-dev-e0695.firebaseapp.com",
  projectId: "auth-dev-e0695",
  storageBucket: "auth-dev-e0695.appspot.com",
  messagingSenderId: "365425948834",
  appId: "1:365425948834:web:afb976924fd93117d0bffb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
