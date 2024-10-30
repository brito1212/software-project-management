import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Components
import Header from "./components/Header";
import Aside from "./components/Aside";

// CSS
import "./App.css";

function App() {
  const [isMenuClosed, setIsMenuClosed] = React.useState(true);
  const closeMenu = () => {
    setIsMenuClosed((state) => !state);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header onCloseMenu={closeMenu} />
          <main className="container">
            <Aside isMenuClosed={isMenuClosed} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </BrowserRouter>

        <footer></footer>
      </div>
    </>
  );
}

export default App;
