import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import Input from "../components/forms/Input";

// Style
import styles from "../components/login/LoginForm.module.css";

import { emailSingUpAction } from "../features/user/userSlice";
import { UserRegistration } from "../features/user/user.type";
import { useAppDispatch } from "../app/store";
import useForm from "../hooks/useForm";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
          console.log("erro");
        }
      )
    );
  }

  return (
    <section className="login">
      <section className="anime-left">
        <h1 className={styles.title}>Sign up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="Nome" type="text" name="first_name" {...first_name} />
          <Input
            label="Sobrenome"
            type="text"
            name="last_name"
            {...last_name}
          />
          <Input label="Username" type="text" name="username" {...username} />
          <Input label="Email" type="email" name="email" {...email} />
          <Input label="Senha" type="password" name="password" {...password} />
          <button className="btn primary btn-form">Cadastrar</button>
        </form>
      </section>
    </section>
  );
};

export default SignUp;
