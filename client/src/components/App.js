import React, { Fragment, useEffect, useState } from 'react'
import GenerateImage from './GenerateImage'
import ImageList from './ImageList'
import axios from 'axios';

import './App.css';


function App() {
  // const [backendData, setBackendData] = useState([{}])

  // async componentDidMount() {
  //     // POST request using fetch with async/await
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ title: 'React POST Request Example' })
  //     };
  //     const response = await fetch('/api/openai', requestOptions);
  //     const data = await response.json();
  //     setBackendData({image_url});
  // }


  return (
    <Fragment>
      <div className="container">
        <GenerateImage />
        <ImageList />
      </div>
    </Fragment>
  );
}

export default App
