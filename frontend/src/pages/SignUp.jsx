import React from "react";

import Input from "../components/forms/Input";

import styles from "../components/login/LoginForm.module.css";

const SignUp = () => {
  return (
    <section className="login">
      <section className="anime-left">
        <h1 className={styles.title}>Sign up</h1>
        <form className={styles.form}>
          <Input label="Nome" type="text" name="first_name" />
          <Input label="Sobrenome" type="text" name="last_name" />
          <Input label="Email" type="email" name="email" />
          <Input label="Senha" type="password" name="password" />
          <button className="btn primary btn-form">Cadastrar</button>
        </form>
      </section>
    </section>
  );
};

export default SignUp;
