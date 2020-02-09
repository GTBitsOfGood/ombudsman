import firebase from "firebase";
import "firebase/storage";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDu2fblA5PCmdknt6reohIMeOlqgf-B1No",
    // authDomain: '<your-auth-domain>',
    storageBucket: "gs://ombudsman-a8077.appspot.com"
  };
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();

export const getPDF = async () => {
  const storageRef = await storage.ref().list({ maxResults: 1 });
  let file = "";
  await storageRef.items.forEach((fileRef) => {
    file = fileRef.name;
  });
  return file;
};
