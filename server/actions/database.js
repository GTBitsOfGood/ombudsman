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
const storage = firebase.storage();
const firestore = firebase.firestore();

export const getCategories = async () => {
  const firestoreRef = firestore.collection("categories").doc("categories");
  let categories = [];
  await firestoreRef.get().then(function(doc) {
    categories = doc.data().catArray;
  });
  return categories;
};

export const updateClicks = async (category, filename) => {
  const firestoreRef = firestore.collection("categories").doc("categories");
  const updateKey = `catArray.${[category]}.${[filename]}.views`;
  firestoreRef.update(updateKey, firebase.firestore.FieldValue.increment(1));
};

export const getPDF = async () => {
  const categoryMap = await getCategories();
  const categories = Object.keys(categoryMap);
  const files = [];
  const storageRef = await storage // eslint-disable-line
    .ref();
  for (let i = 0; i < categories.length; i += 1) {
    const folder = await storageRef.child(categories[i]).list();
    const foldItems = folder.items;
    for (let j = 0; j < foldItems.length; j += 1) {
      let views = 0;
      if (
        foldItems[j].name.slice(0, -4) in categoryMap[categories[i]] &&
        "views" in categoryMap[categories[i]][foldItems[j].name.slice(0, -4)]
      ) {
        views =
          categoryMap[categories[i]][foldItems[j].name.slice(0, -4)].views;
      }
      await foldItems[j].getDownloadURL().then(imgURL => {
        files.push({
          imgURL,
          fileName: foldItems[j].name,
          categories: categories[i],
          views
        });
      });
    }
  }
  return files;
};


