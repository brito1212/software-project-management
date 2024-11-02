import { Routes, Route } from "react-router-dom";

import { LoginForm } from "../components/index";
import { LoginPasswordLost } from "../components/index";

const Login = () => {
  return (
    <section className="login">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/lost" element={<LoginPasswordLost />} />
      </Routes>
    </section>
  );
};

export default Login;
