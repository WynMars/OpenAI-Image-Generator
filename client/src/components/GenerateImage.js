import React, { useState } from "react";
import axios from "axios";
import anywhereDoor from "../image/anywhereDoor.png";

//React don't need to install dotenv, since it already included
// require("dotenv").config();

//config out of the folder
// const config = require("../../../config");
// const REACT_APP_AUTHORIZATION = config.get("REACT_APP_AUTHORIZATION");

//loadier
import ClipLoader from "react-spinners/ClipLoader";

{/* <PulseLoader color="#36d7b7" />; */}


export default function GenerateImage() {
  const sampleImg = anywhereDoor;

  const [image, setImage] = useState(sampleImg);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (e) => {
    setTextInput(e.target.value);
  };

// console.log(process.env);

//Create Axios 
  // const api = axios.create({
  //   baseURL: "/api",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  // });

  const generateHandler = async (e) => {
    e.preventDefault();

 if (!textInput) {
   setErrorMessage("Input field cannot be empty");
 } else {
   setErrorMessage("");

   setLoading(true);

   const postData = {
     prompt: textInput,
   };

   const response = await axios.post("/api/openai", postData);
   const url = response.data;
   console.log(url);
   setImage(url);
   setLoading(false);
 }
    // api
    //   .post("/openai", postData)
    //   .then((response) => {
    //     const url = response.data;
    //     console.log(url)
    //     setImage(url);

    //   });
  };

  // const getImage = async (e) => {
  //   e.preventDefault();
  //   const response = await api.get("/openai");
  //   let image_url = response.data[0].image_url;
  //   console.log(image_url);

  //   setImage(image_url);
  //   setTextInput("");
  // };

  return (
    <div>
      <form onSubmit={generateHandler}>
        <textarea
          placeholder="Please type your image description..."
          className="form-control"
          onChange={changeHandler}
          value={textInput}
          cols="50"
          rows="5"
        ></textarea>
        <p>{errorMessage}</p>
        <button className="btn btn-dark">Generate Image</button>
        <div>
          {loading ? (
            <ClipLoader
              className="loader"
              color={"#6c6d6d"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <img src={image} alt="openAIImage" />
          )}
        </div>
      </form>
    </div>
  );
}
