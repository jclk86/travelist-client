import config from "../config";
import TokenService from "../Services/token-service";
import IdleService from "./idle-service";

const AuthApiService = {
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => {
        // Saves encrypted token in session storage.
        TokenService.saveAuthToken(res.authToken);
        IdleService.registerIdleTimerResets();
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken();
        });
        return res;
      });
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // Requests to backend to execute createJWT and send payload again.
  // This is triggered in set intervals.
  // check desktop version
  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken();
        });
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export default AuthApiService;
