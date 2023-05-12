import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Get a Firestore instance
export const app = firebase.initializeApp({
  projectId: "rad-radio-c5666",
  databaseURL:
    "https://rad-radio-c5666-default-rtdb.europe-west1.firebasedatabase.app",
});

export const db = getFirestore(app);
