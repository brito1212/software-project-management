import Input from "../forms/Input";
import styles from "./LoginForm.module.css";

const LoginPasswordLost = () => {
    return (   
    <section className="anime-left">
        <h1 className={styles.title}>Perdeu a senha?</h1>
        <form className={styles.form}>
          <Input label="Email" type="email" name="email" />
          <button className="btn primary btn-form">Enviar e-mail</button>
        </form>
    </section>)
}

export default LoginPasswordLost;