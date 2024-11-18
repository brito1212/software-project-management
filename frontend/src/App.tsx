import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

// Components
import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";

// CSS
import "./App.css";
import ProtectedRoute from "./components/helper/ProtectedRoute";

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
              <Route path="/media/*" element={<></>} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <></>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
