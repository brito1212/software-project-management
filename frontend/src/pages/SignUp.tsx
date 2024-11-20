import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import Input from "../components/forms/Input";

// Style
import styles from "../components/login/LoginForm.module.css";

import { emailSingUpAction } from "../features/user/userSlice";
import { UserRegistration } from "../features/user/user.type";
import { useAppDispatch, useAppSelector } from "../app/store";
import useForm from "../hooks/useForm";

import stylesSignUp from "../components/forms/Input.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.toast);
  const [error, setError] = React.useState(false);

  const first_name = useForm();
  const last_name = useForm();
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const registrationData = {
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    } as UserRegistration;

    dispatch(
      emailSingUpAction(
        registrationData,
        () => navigate("../login"),
        () => {
          setError(true);
        }
      )
    );
  }

  return (
    <section className="login">
      <section className="anime-left">
        <h1 className={styles.title}>Sign up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Nome"
            type="text"
            name="first_name"
            styles={stylesSignUp}
            {...first_name}
          />
          <Input
            label="Sobrenome"
            type="text"
            name="last_name"
            styles={stylesSignUp}
            {...last_name}
          />
          <Input
            label="Username"
            type="text"
            name="username"
            styles={stylesSignUp}
            {...username}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            styles={stylesSignUp}
            {...email}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            styles={stylesSignUp}
            {...password}
          />
          {error && <p className={styles.error}>{message}</p>}
          <button className="btn primary btn-form">Cadastrar</button>
        </form>
      </section>
    </section>
  );
};

export default SignUp;
