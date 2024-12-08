import { Input } from "../index";
import styles from "./LoginForm.module.css";
import useForm from "../../hooks/useForm.ts";
import stylesLogin from "../forms/Input.module.css";

const LoginPasswordLost = () => {
  const email = useForm("email");
  return (
    <section className={styles.login}>
      <section className="anime-left">
        <h1 className={styles.title}>Perdeu a senha?</h1>
        <form className={styles.form}>
          <Input
            label="Email"
            type="email"
            name="email"
            styles={stylesLogin}
            {...email}
          />
          <button className="btn primary btn-form">Enviar e-mail</button>
        </form>
      </section>
    </section>
  );
};

export default LoginPasswordLost;
