import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';


global.XMLHttpRequest = require('xhr2');

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyDu2fblA5PCmdknt6reohIMeOlqgf-B1No',
    authDomain: 'ombudsman-a8077.firebaseapp.com',
    projectId: 'ombudsman-a8077',
    storageBucket: 'gs://ombudsman-a8077.appspot.com',
    databaseURL: 'https://ombudsman-a8077.firebaseio.com',
  };
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();

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
  const updateKey = `catArray.${category}.${fileName}.views`;
  await firestoreRef.update(updateKey, firebase.firestore.FieldValue.increment(1));
};

/**
 * Adds keyword to metadata.
 *
 * @param {string} category category name
 * @param {string} fileName file name
 * @param {string} keyWord new keyword to be added
 */
export const addKeyword = async (category, fileName, keyWord) => {
  const firestoreRef = firestore.collection('categories').doc('categories');
  const updateKey = `catArray.${category}.${fileName}.metadata`;
  await firestoreRef.update(updateKey, firebase.firestore.FieldValue.arrayUnion(keyWord));
};

/**
 * Adds a file object (pdf) to storage.
 *
 * @param {string} category category name
 * @param {string} fileName file name
 * @param {File} file file to be uploaded
 */
export const uploadDocument = async (category, fileName, file) => {
  const firebaseRef = firebase.storage().ref();
  const fileRef = firebaseRef.child(`${category}/${fileName}`);
  await fileRef.put(file);
};

/**
 * Adds document information to firestore
 *
 * @param {string} category category name
 * @param {string} fileName file name
 * @param {string} tag federal or state tag
 * @param {string} description federal or state tag
 * @param {Array} keyWords keyword to add to the metadata
 * 
 */

 // TODO: Update function calls to batch call
export const addInfo = async (category, fileName, tag, description, keyWords) => {
  const firestoreRef = firestore.collection('categories').doc('categories');
  const updateKey = `catArray.${category}.${fileName}`;
  await firestoreRef.update(updateKey + '.tag', tag);
  await firestoreRef.update(updateKey + '.description', description);
  if (keyWords.length > 0) await firestoreRef.update(updateKey + '.metadata', keyWords);
  return 'Success';
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
      let metadata = [];
      let tag = '';
      let description = '';
      const slicedFileName = file.name.slice(0, -4);

      if (slicedFileName in categoryMap[category]) {
        if ('views' in categoryMap[category][slicedFileName])
          views = categoryMap[category][slicedFileName].views;
        if ('metadata' in categoryMap[category][slicedFileName])
          metadata = categoryMap[category][slicedFileName].metadata;
        if ('tag' in categoryMap[category][slicedFileName])
          tag = categoryMap[category][slicedFileName].tag;
        if ('description' in categoryMap[category][slicedFileName])
          description = categoryMap[category][slicedFileName].description;
      }

      return file.getDownloadURL().then(imgURL => {
        const pdfData = {
          url: imgURL,
          fileName: file.name,
          views,
          tag,
          description,
          metadata,
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

export const authenticate = async (email, password) => {
  let result = 'Login successful';
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch(error) {
    result = error.message;
  }
  return result;
};

/**
 * Signs the current user out.
 *
 */

export const signOut = async () => {
  let result = 'Sign out successful';
  try {
    await auth.signOut();
  } catch(error) {
    result = error.message;
  }
  return result;
};





