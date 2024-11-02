import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Input } from "../index";

import styles from "./LoginForm.module.css";

import { loginAction } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/store";
import useForm from "../../hooks/useForm.ts";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useForm("email");
  const password = useForm("password");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    dispatch(
      loginAction(
        email.value,
        password.value,
        () => navigate("/"),
        () => {
          console.log("erro");
        }
      )
    );
  }

  return (
    <section className="anime-left">
      <h1 className={styles.title}>Sign in</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <button className="btn primary btn-form">Entrar</button>
      </form>
      <Link className={styles.lost} to="/login/lost">
        Perdeu a senha?
      </Link>
    </section>
  );
};

export default LoginForm;
