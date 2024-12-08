import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Input } from "../index";

import styles from "./LoginForm.module.css";

import { loginAction } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import useForm from "../../hooks/useForm.ts";

import stylesLogin from "../forms/Input.module.css";
import Loading from "../helper/Loading.tsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useForm("");
  const password = useForm("");

  const { message } = useAppSelector((state) => state.toast);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    dispatch(
      loginAction(
        email.value,
        password.value,
        () => {
          setLoading(false);
          navigate("/");
        },
        () => {
          setLoading(false);
          setError(true);
        }
      )
    );
  }

  if (loading) return <Loading />;
  return (
    <section className={styles.login}>
      <section className="anime-left">
        <h1 className={styles.title}>Sign in</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            styles={stylesLogin}
            {...email}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            styles={stylesLogin}
            {...password}
          />
          {error && <p className={styles.error}>{message}</p>}
          <button className="btn primary btn-form">Entrar</button>
        </form>
        <Link className={styles.lost} to="/login/lost">
          Perdeu a senha?
        </Link>
      </section>
    </section>
  );
};

export default LoginForm;
