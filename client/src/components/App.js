import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateImage from "./GenerateImage";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar";
import Register from "./auth/register";
import LogIn from "./auth/login";
import Alert from "../components/layout/alert";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/image" element={<GenerateImage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
