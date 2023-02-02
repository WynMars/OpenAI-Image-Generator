import React, { useState } from "react";
import axios from "axios";
import anywhereDoor from "../image/anywhereDoor.png";

// require("dotenv").config();

// const config = require("../../../config");
// const REACT_APP_AUTHORIZATION = config.get("REACT_APP_AUTHORIZATION");


// import loader from "../image/spinner-solid.svg";
// import PulseLoader from "react-spinners/PulseLoader";

{/* <PulseLoader color="#36d7b7" />; */}


export default function GenerateImage() {
  const sampleImg = anywhereDoor;
  const loadingImg = "Generating...";

  const [image, setImage] = useState(sampleImg);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setTextInput(e.target.value);
  };

// console.log(process.env);

  const api = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
    },
  });

  const generateHandler = async (e) => {
    e.preventDefault();
    setTextInput("");
    setLoading(true);

    const postData = {
      prompt: textInput,
    };

    const response = await api.post("/openai", postData);
    const url = response.data;
    console.log(url);
    setImage(url);
    setLoading(false);

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
      <form>
        <textarea placeholder="Please type your image description..."
          className="form-control"
          onChange={changeHandler}
          value={textInput}
          cols="50"
          rows="5"
        ></textarea>
        <button className="btn btn-dark" onClick={generateHandler}>
          Generate Image
        </button>
        <div>
          {loading ? <h1>{loadingImg}</h1> : <img src={image} alt="openAIImage" />}
        </div>
      </form>
    </div>
  );
}
