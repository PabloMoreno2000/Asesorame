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
    //traer el usuario ya autenticado
    getAuthUser: () => db("GET", "/api/auth/", null, true, {}),
    //autenticar usuario, regresa su token
    postAuthUser: (username, password) =>
      db("POST", "/api/auth/", { username, password }, false, {}),
  },
  tutoringSessions: {
    create: (begins, ends) =>
      db("POST", "/api/sessions/create/", { begins, ends }, true, {}),
    scheduleWithStudent: (sessionId, subjectId) =>
      db(
        "PUT",
        "/api/sessions/scheduleWithStudent/",
        { sessionId, subjectId },
        true,
        {}
      ),
    getSessionsByTutor: (sendUnreserved) =>
      db(
        "GET",
        `/api/sessions/getSessionsByTutor/${sendUnreserved}`,
        null,
        true,
        {}
      ),
    getAvailableSessionsWithTutor: (tutorId) =>
      db(
        "GET",
        `/api/sessions/getAvailableSessionsWithTutor/${tutorId}`,
        null,
        false,
        {}
      ),
    getSessionsByUser: () =>
      db("GET", "/api/sessions/getSessionsByUser", null, true, {}),
    postTutorSessions: (sessions) =>
      db("POST", "/api/sessions/createBatch", { sessions }, true, {}),
  },
  tutors: {
    getAllBySubject: (subjectId) =>
      db("GET", `/api/tutors/getAllBySubject/${subjectId}`, null, false, {}),
    updateSubjects: (subjectIdsList) =>
      db(
        "PUT",
        "/api/tutors/updateSubjects",
        { subjects: subjectIdsList },
        true,
        {}
      ),
    saveLink: (link) => db("PUT", "/api/tutors/setLink", { link }, true, {}),
  },
  users: {
    createUser: (username, password) =>
      db("POST", "/api/users/", { username, password }, false, {}),
  },
  subjects: {
    getAll: () => db("GET", "/api/subjects/getAll/", null, false, {}),
  },
};

//export API;
/*
    scripts
        API.js
            
*/
