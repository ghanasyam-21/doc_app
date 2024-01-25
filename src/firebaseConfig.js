import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5Xh6sT9ky892Xh-grToiEgwzYqB8beV0",
    authDomain: "docsapp-cd9f4.firebaseapp.com",
    projectId: "docsapp-cd9f4",
    storageBucket: "docsapp-cd9f4.appspot.com",
    messagingSenderId: "163304825921",
    appId: "1:163304825921:web:866881009021543200d2c0",
    measurementId: "G-VX5316XD3Z"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)