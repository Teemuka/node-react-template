import { getLocalUser, removeLocalUser, setLocalUser } from "./_tokenService";
import api from "./api";

export const login = (email, password) => {
  return api
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

export const logout = () => {
  removeLocalUser();
};

export const getCurrentUser = () => {
  return getLocalUser();
};

export const setCurrentUser = (user) => {
  return setLocalUser(user);
};
