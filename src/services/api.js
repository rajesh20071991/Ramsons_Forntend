import axios from "axios";

export const EndPointApi = "http://localhost:8000";
// export const EndPointApi = "https://admin.figleo.in";

export let api = async function ({ method = "get", api, body }) {
  return await new Promise((resolve, reject) => {
    let key = localStorage.getItem("AuthToken");
    axios(EndPointApi + api, {
      method: method,
      headers: {
        Authorization: "Token " + key,
      },
      data: body,
    })
      .then((data) => {
        resolve(statusHelper(data));
      })
      .catch((error) => {
        try {
          if (error.response) {
            reject(statusHelper(error.response));
          } else {
            reject(error);
          }
        } catch (err) {
          reject(err);
        }
      });
  });
};

var statusHelper = (data) => {
  if (data.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  } else {
    return data.data;
  }
};
