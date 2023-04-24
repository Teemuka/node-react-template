import axios from "axios";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  removeLocalUser,
  updateLocalAccessToken,
} from "./_tokenService";

const instance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refresh-token", {
            refreshToken: getLocalRefreshToken(),
          });

          const { token } = rs.data;
          updateLocalAccessToken(token);

          return instance(originalConfig);
        } catch (error) {
          removeLocalUser();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
