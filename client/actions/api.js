import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

/**
 * Get a list of all PDFs.
 *
 * @typedef {{ url: string, fileName: string, views: number, category: string }} pdf
 * @returns {Promise<{pdfMap: Object.<string, pdf[]>, sortedPdfs: pdf[]}>} object of PDF metadata
 */
export const getPDF = () =>
  fetch(urls.baseUrl + urls.api.example, {
    method: "get",
    mode: "no-cors",
    credentials: "include"
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

/**
 * Increment clicks for a file.
 * 
 * @param {string} category 
 * @param {string} filename 
 */
export const updateClicks = (category, filename) => {
  fetch(urls.baseUrl + urls.api.updateClicks, {
    method: "post",
    mode: "no-cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      category,
      filename
    })
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

/**
 * Get a list of all categories.
 * 
 * @returns {Promise<string[]>} a list of categories
 */
export const getCategories = () =>
  fetch(urls.baseUrl + urls.api.categories, {
    method: "get",
    mode: "no-cors",
    credentials: "include"
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }
      return json.payload;
    });
