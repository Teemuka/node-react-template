import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { getUserById } from "../services/userService";

const ProfileComponent = (props) => {
  const [, onLogout, user] = useOutletContext();

  useEffect(() => {
    getUserById(1).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      {user && <h1>{user.name}</h1>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

ProfileComponent.propTypes = {};

export default ProfileComponent;
