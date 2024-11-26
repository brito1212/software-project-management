import React from "react";
import { useLocation } from "react-router-dom";

const Main = ({ children }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]); // Executa toda vez que o pathname mudar
  return <main className="container">{children}</main>;
};

export default Main;
