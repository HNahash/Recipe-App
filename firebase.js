// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCNg_vksVCFju5PoXe881SYmrIPdEmqOPs",
  authDomain: "recipe-491b3.firebaseapp.com",
  projectId: "recipe-491b3",
  storageBucket: "recipe-491b3.appspot.com",
  messagingSenderId: "179196063765",
  appId: "1:179196063765:web:eea0ae8d4cad3bc7145e1c",
};

// Initialize Firebase
let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp({ ...firebaseConfig });
} else {
  app = firebase.app(); // if already initialized, use that one
}

export const firestore = app;
export const db = app.firestore();
export const auth = app.auth();
export const storageRef = app.storage();

export default firebase;

// Adding Recipe Details to Firestore
export function addRecipe(recipe, addComplete) {
  db.collection("Recipes")
    .add({
      name: "cola",
      //createdAt: db.FieldValue.serverTimestamp(),
    })
    .then((data) => addComplete(data))
    .catch((error) => alert(error));
}
