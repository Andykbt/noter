import { initializeApp } from "@firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebase = initializeApp({
    apiKey: "AIzaSyAnyxDubg2HcGz5KKrwisD5dhGrQRuUV_o",
    authDomain: "noter-9df15.firebaseapp.com",
    projectId: "noter-9df15",
    storageBucket: "noter-9df15.appspot.com",
    messagingSenderId: "881323563811",
    appId: "1:881323563811:web:f200c5336118850d92ca96"
})

export const db = getFirestore()
