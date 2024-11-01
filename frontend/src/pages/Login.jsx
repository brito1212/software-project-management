import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "../components/login/LoginForm";
import LoginPasswordLost from "../components/login/LoginPasswordLost";

const Login = () => {
  return (
    <section className="login">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/lost" element={<LoginPasswordLost />} />
      </Routes>
    </section>
  );
};

export default Login;
