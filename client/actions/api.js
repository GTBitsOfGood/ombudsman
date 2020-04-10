import fetch from 'isomorphic-unfetch';
import urls from '../../utils/urls';

/**
 * @typedef {{ url: string, fileName: string, views: number, category: string }} pdf
 * @typedef {{ fileName: string, views: number }} pdfLite
 */

/**
 * Get a list of all PDFs.
 *
 * @returns {Promise<{pdfMap: {[category: string]: pdf[]}, sortedPdfs: pdf[]}>} object of PDF properties
 */
export const getPDF = () =>
  fetch(urls.baseUrl + urls.api.getPDF, {
    method: 'get',
    mode: 'no-cors',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error('Could not connect to API!');
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

/**
 * Increment clicks for a file.
 *
 * @param {string} category
 * @param {string} fileName
 */
export const updateClicks = (category, fileName) =>
  fetch(urls.baseUrl + urls.api.updateClicks, {
    method: 'post',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      category,
      fileName
    })
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error('Could not connect to API!');
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

/**
 * Attempts to sign in the user and returns a message with the sign-in status.
 * 
 * @param {string} email
 * @param {string} password
 */
export const authenticate = (email, password) =>
  fetch(urls.baseUrl + urls.api.authenticate, {
    method: 'post',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error('Could not connect to API!');
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

/**
 * Signs out the user.
 *
 */
export const signOut = () =>
  fetch(urls.baseUrl + urls.api.signOut, {
    method: 'get',
    mode: 'no-cors',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error('Could not connect to API!');
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });


/**
 * Add keyword to metadata for a file
 *
 * @param {string} category
 * @param {string} fileName
 * @param {string} keyWord
 */
export const addKeyword = (category, fileName, keyWord) =>
  fetch(urls.baseUrl + urls.api.addKeyword, {
    method: 'post',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      category,
      fileName,
      keyWord
    })
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error('Could not connect to API!');
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

    /**
 * Adds document info to firestore
 *
 * @param {string} category category name
 * @param {string} fileName file name
 * @param {string} tag federal or state tag
 * @param {string} description federal or state tag
 * @param {Array} keyWords keyword to add to the metadata
 */
export const addInfo = (category, fileName, tag, description, keyWords) =>
fetch(urls.baseUrl + urls.api.addInfo, {
  method: 'post',
  mode: 'no-cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    category,
    fileName,
    tag, 
    description, 
    keyWords
  })
})
  .then(response => response.json())
  .then(json => {
    if (json == null) {
      throw new Error('Could not connect to API!');
    } else if (!json.success) {
      console.log(json)
      throw new Error(json.message);
    }

    return json.payload;
  });