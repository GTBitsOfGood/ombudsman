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
export const updateClicks = (category, fileName) => {
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
};

export const authenticate = (email, password) => {
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
};

export const signOut = () => {
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
};
