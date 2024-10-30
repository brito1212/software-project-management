import React from "react";
import { Link } from "react-router-dom";

import Input from "../forms/Input";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <section className="anime-left">
      <h1 className={styles.title}>Sign in</h1>
      <form className={styles.form}>
        <Input label="Email" type="email" name="email" />
        <Input label="Senha" type="password" name="password" />
        <button className="btn primary btn-form">Entrar</button>
      </form>
      <Link className={styles.lost} to="/login/lost">
        Perdeu a senha?
      </Link>
    </section>
  );
};

export default LoginForm;
