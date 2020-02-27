import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

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
