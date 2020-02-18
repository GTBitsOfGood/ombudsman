import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";

global.XMLHttpRequest = require("xhr2");

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDu2fblA5PCmdknt6reohIMeOlqgf-B1No",
    // authDomain: '<your-auth-domain>',
    projectId: "ombudsman-a8077",
    storageBucket: "gs://ombudsman-a8077.appspot.com"
  };
  firebase.initializeApp(firebaseConfig);
}
const firebase = firebase.storage();
const firestore = firebase.firestore();

export const getCategories = async () => {
  const firestoreRef = firestore.collection("categories").doc("categories");
  let categories = [];
  await firestoreRef.get().then(function(doc) {
    categories = doc.data().catArray;
  });
  return categories;
};

export const getPDF = async () => {
  const categories = await getCategories();
  const files = [];
  const promises = [];
  for (let i = 0; i < categories.length; i += 1) {
    const storageRef = await firebase // eslint-disable-line
      .ref(categories[i])
      .list({ maxResults: 100 });
    promises.push(
      storageRef.items.map(async fileRef => {
        fileRef.getDownloadURL().then(async imgURL => {
          return files.push({
            imgURL,
            fileName: fileRef.name,
            categories: categories[i]
          });
        });
      })
    );
  }
  await Promise.all(promises);
  return files;
};
