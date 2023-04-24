import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  login,
  logout,
  getCurrentUser,
  setCurrentUser,
} from "../services/authService";

const AuthProvider = (props) => {
  const user = getCurrentUser()?.user;
  const location = useLocation();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    login(email, password).then((res) => {
      setCurrentUser(res);
      navigate("/profile");
    });
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  if (user) {
    if (location.pathname === "/login") {
      return <Navigate to="/profile" />;
    } else if (location.pathname === "/") {
      return <Navigate to="/profile" />;
    }
  } else {
    if (location.pathname !== "/login") {
      return <Navigate to="/login" />;
    }
  }

  return <Outlet context={[onLogin, onLogout, user]} />;
};

export default AuthProvider;
