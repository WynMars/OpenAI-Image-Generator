//old redux set up
// import {createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState ={};

// const middleware =[thunk]

// const store = configureStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import alert from './reducers/alert'
import auth from './reducers/auth';

const store = configureStore({
  reducer: {
    alert,
    auth,
  },
});

export default store;
