
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDoPGEekj4e0kBkyDVkxAh1pCsFFchp4qg",
  authDomain: "react-fire-todoapp.firebaseapp.com",
  projectId: "react-fire-todoapp",
  storageBucket: "react-fire-todoapp.appspot.com",
  messagingSenderId: "342976154816",
  appId: "1:342976154816:web:946c816a11a6a608f23125",
  measurementId: "G-7R9LPZBZ2R"
};

 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)