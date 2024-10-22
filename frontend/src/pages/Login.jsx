import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "../components/login/LoginForm";

import styles from "../components/login/LoginForm.module.css";

const Login = () => {
  return (
    <section className={styles.login}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </section>
  );
};

export default Login;
