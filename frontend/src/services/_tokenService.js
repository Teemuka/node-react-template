export const getLocalRefreshToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).refreshToken : null;
};

export const getLocalAccessToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

export const updateLocalAccessToken = (token) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user);
    parsedUser.token = token;
    localStorage.setItem("tokens", JSON.stringify(parsedUser));
  }
};

export const getLocalUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setLocalUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
