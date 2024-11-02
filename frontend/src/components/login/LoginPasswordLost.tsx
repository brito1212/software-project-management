import { Input } from "../index";
import styles from "./LoginForm.module.css";
import useForm from "../../hooks/useForm.ts";

const LoginPasswordLost = () => {
  const email = useForm("email");
  return (
    <section className="anime-left">
      <h1 className={styles.title}>Perdeu a senha?</h1>
      <form className={styles.form}>
        <Input label="Email" type="email" name="email" {...email} />
        <button className="btn primary btn-form">Enviar e-mail</button>
      </form>
    </section>
  );
};

export default LoginPasswordLost;
