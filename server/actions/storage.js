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
  const storageRef = await storage.ref().list({ maxResults: 100 });
  const files = [];
  const filePromises = storageRef.items.map(async fileRef => {
    return fileRef.getDownloadURL().then(imgURL => {
      files.push({ imgURL, fileName: fileRef.name });
    });
  });
  await Promise.all(filePromises);
  return files;
};
