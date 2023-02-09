import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateImage from "./GenerateImage";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/image" element={<GenerateImage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
