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
