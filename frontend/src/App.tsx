import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Media from "./pages/Media";

// Components
import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";

// CSS
import "./App.css";
import List from "./pages/List";
import Main from "./components/helper/Main";

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
          <Main>
            <Aside isMenuClosed={isMenuClosed} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/midia" element={<Media />} />
              <Route path="/midia/:mediaType/:id" element={<Media />} />
              <Route path="/list/*" element={<List />} />
              <Route path="/account" element={<Profile />} />
            </Routes>
          </Main>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
