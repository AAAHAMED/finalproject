import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC20SscgbsgjJucbgwEbt-8EHgKl35lSDQ",
  authDomain: "react-path-finding.firebaseapp.com",
  projectId: "react-path-finding",
  storageBucket: "react-path-finding.appspot.com",
  messagingSenderId: "773954020665",
  appId: "1:773954020665:web:983d69aa31dc2d754674e8",
  measurementId: "G-71T5KHD8NK",
  databaseURL: "https://react-path-finding-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
