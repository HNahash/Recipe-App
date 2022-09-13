// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



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
