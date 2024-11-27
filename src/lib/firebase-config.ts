import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi_vnV0v8Nl8LwjySJPOUp460-T_0uiaY",
  authDomain: "vrv0-e8491.firebaseapp.com",
  projectId: "vrv0-e8491",
  storageBucket: "vrv0-e8491.firebasestorage.app",
  messagingSenderId: "98726871810",
  appId: "1:98726871810:web:d4069384b54d9598fb781b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);