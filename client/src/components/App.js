import React, { Fragment} from 'react'
import GenerateImage from './GenerateImage'
import Chatbot from "./Chatbot";

import './App.css';


function App() {
  
  return (
    <Fragment>
    <div className="container">
        <GenerateImage />
     </div>
      <div className="container">
        <Chatbot />
      </div>
    </Fragment>
  );
}

export default App
