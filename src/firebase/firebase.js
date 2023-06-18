import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4xMpTdre6fbXFyA4JSELC-n3YWQj7Iks",
  authDomain: "rediva-life.firebaseapp.com",
  projectId: "rediva-life",
  storageBucket: "rediva-life.appspot.com",
  messagingSenderId: "826782069743",
  appId: "1:826782069743:web:c1893d36fdad49e4ccbc1a",
  measurementId: "G-HVTFF4TYML",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
