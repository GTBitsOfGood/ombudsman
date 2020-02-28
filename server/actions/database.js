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
const dbCategory = "catArray";

export const getCategories = async () => {
  const firestoreRef = firestore.collection("categories").doc("categories");
  let categories = [];
  const doc = await firestoreRef.get();
  categories = doc.data()[dbCategory];
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
  const storageRef = await storage.ref();
  const pdfMap = {};
  const sortedPdfs = [];
  let outerPromises = [];
  outerPromises = categories.map(async category => {
    const folder = await storageRef.child(category).list();
    const foldItems = folder.items;
    pdfMap[category] = [];
    let promises = [];
    promises = foldItems.map(async file => {
      let views = 0;
      if (
        file.name.slice(0, -4) in categoryMap[category] &&
        "views" in categoryMap[category][file.name.slice(0, -4)]
      ) {
        views = categoryMap[category][file.name.slice(0, -4)].views;
      }
      return file.getDownloadURL().then(imgURL => {
        const pdfData = {
          url: imgURL,
          fileName: file.name,
          views,
          category
        };
        pdfMap[category].push(pdfData);
        sortedPdfs.push(pdfData);
      });
    });
    return Promise.all(promises);
  });
  await Promise.all(outerPromises);
  sortedPdfs.sort((a, b) => {
    if (a.views < b.views) return 1;
    if (a.views > b.views) return -1;
    return a.fileName > b.fileName ? 1 : -1;
  });
  return { pdfMap, sortedPdfs };
};
