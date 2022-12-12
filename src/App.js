import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AboutUs from "./pages/AboutUs";
import CreateAnEvent from "./pages/CreateAnEvent";
import Header from "./components/Header";
import SpecificCategory from "./pages/SpecificCategory";
import SpecificEvent from "./pages/SpecificEvent";
import CrudEventForm from './pages/CrudEventForm';
import { ThemeState } from "./ThemeContext";
import { UserState } from "./UserContext";
import Footer from "./components/Footer";

function App() {
  const { bgColor } = ThemeState();
  const { user } = UserState();

  return (
    <div style={{backgroundColor: bgColor}}>
      <Header />
      <main>
        <Routes>
          <Route exact="true" path="/" element={<Hero />} />
          {"error" in user ? (
            <Route
              exact="true"
              path="/login"
              element={<Login />}
            />
          ) : (
            " "
          )}

          <Route
            path="/create-an-event"
            element={<CreateAnEvent />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/specific-category/:id" element={<SpecificCategory />} />
          <Route path="/specific-event/:id" element={<SpecificEvent />} />
          <Route
            path="/user-profiles/:id"
            element={
              <UserProfile />
            }
          />
          <Route path="/update-specific-event/:id" element={<CrudEventForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
