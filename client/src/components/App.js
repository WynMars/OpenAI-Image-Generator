import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateImage from "./GenerateImage";
import Chatbot from "./Chatbot";
import Navbar from "./layout/Navbar";
import Register from "./auth/register";
import LogIn from "./auth/login";
import Alert from "../components/layout/alert";

//Redux
import {Provider} from 'react-redux'
import store from "../store";
import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "../actions/auth";

import "./App.css";

function App() {

 useEffect(() => {
   // check for token in LS when app first runs
   if (localStorage.token) {
     // if there is a token set axios headers for all requests
     setAuthToken(localStorage.token);
   }
   // try to fetch a user, if no token or invalid token we
   // will get a 401 response from our API
   store.dispatch(loadUser());

   // log user out from all tabs if they log out in one tab
  //  window.addEventListener("storage", () => {
  //    if (!localStorage.token) store.dispatch({ type: LOGOUT });
  //  });
 }, []);



  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
