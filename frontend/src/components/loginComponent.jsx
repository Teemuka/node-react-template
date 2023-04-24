import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const LoginComponent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onLogin] = useOutletContext();

  const login = () => {
    onLogin({ email, password });
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} type="email"></input>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
};

LoginComponent.propTypes = {};

export default LoginComponent;
