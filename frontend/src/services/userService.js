import api from "./api";

export const getUserById = (id) => {
  return api.get("api/user/" + id);
};
