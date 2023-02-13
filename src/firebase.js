import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDQiPoM5tCKaB3h9D-z5ofNkDkyHvY97Ss",
  authDomain: "nature-app-ea443.firebaseapp.com",
  projectId: "nature-app-ea443",
  storageBucket: "nature-app-ea443.appspot.com",
  messagingSenderId: "380787145620",
  appId: "1:380787145620:web:39b00cbf4d646b441ead81"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)



export { auth, db, storage };
