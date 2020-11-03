import axios from "axios";

function db(requestType, url, data, requiresAuth, headers) {
  url = "http://localhost:5050" + url;
  let request = null;
  if (requiresAuth) {
    // PUT auth token
    headers["x-auth-token"] = localStorage.getItem("x-auth-token");
  }
  const config = {
    headers,
  };

  switch (requestType) {
    case "GET":
      request = axios.get(url, config);
      break;
    case "POST":
      request = axios.post(url, data, config);
      break;
    case "PUT":
      request = axios.put(url, data, config);
      break;
    case "DELETE":
      request = axios.delete(url, data, config);
      break;
    default:
      request = "Bad request type";
      break;
  }
  return request;
}

/* API.auth.getAuthUser(data, requieresAuth)*/

export const API = {
  auth: {
    getAuthUser: () => db("GET", "/api/users/", null, true, {}),
    postAuthUser: (username, password) =>
      db("POST", "/api/auth/", { username, password }, false, {}),
  },
  tutoringSessions: {
    //createSession: (tutor, begins, subject, minutestime) => db("")
  },
  tutors: {},
  users: {
    createUser: (username, password) =>
      db("POST", "/api/users/", { username, password }, false, {}),
  },
};

//export API;
/*
    scripts
        API.js
            
*/
