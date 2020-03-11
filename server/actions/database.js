import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

global.XMLHttpRequest = require('xhr2');

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyDu2fblA5PCmdknt6reohIMeOlqgf-B1No',
    // authDomain: '<your-auth-domain>',
    projectId: 'ombudsman-a8077',
    storageBucket: 'gs://ombudsman-a8077.appspot.com'
  };
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();
const firestore = firebase.firestore();
const dbCategory = 'catArray';

/**
 * @typedef {{ url: string, fileName: string, views: number, category: string }} pdf Note that url refers to the image URL.
 * @typedef {{ fileName: string, views: number }} pdfLite
 */

/**
 * Get a list of all categories and their PDFs.
 *
 * @returns {Promise<{[category: string]: pdfLite[]}>} object mapping categories to a list of PDF property objects
 */
export const getCategories = async () => {
  const firestoreRef = firestore.collection('categories').doc('categories');
  let categories = [];
  const doc = await firestoreRef.get();
  categories = doc.data()[dbCategory];
  return categories;
};

/**
 * Increment number of clicks for a certain file.
 *
 * @param {string} category category name
 * @param {string} fileName file name
 */
export const updateClicks = async (category, fileName) => {
  const firestoreRef = firestore.collection('categories').doc('categories');
  const updateKey = `catArray.${[category]}.${[fileName]}.views`;
  firestoreRef.update(updateKey, firebase.firestore.FieldValue.increment(1));
};

/**
 * Get a list of all PDFs in the database.
 *
 * @returns {Promise<{pdfMap: {[category: string]: pdf[]}, sortedPdfs: pdf[]}>} object with pdfMap which maps categories to a list of PDF property objects, and sortedPdfs which is a list of all PDFs, sorted by most views to least views, and in the case of a tie, then alphabetically.
 *
 * Each PDF property object is in the format of {
 *     url: string (image URL),
 *     fileName: string,
 *     views: number,
 *     category: string
 * }
 */
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
        'views' in categoryMap[category][file.name.slice(0, -4)]
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
