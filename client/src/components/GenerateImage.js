import React, { useState, useEffect } from "react";
import axios from "axios";
import anywhereDoor from "../image/anywhereDoor.png";
// const auth_api = process.env.REACT_APP_AUTHORIZATION
// require("dotenv").config();
// const Authorization_key = config.get("Authorization_key");

export default function GenerateImage() {
  const sampleImg = anywhereDoor;

  const [image, setImage] = useState(sampleImg);
  const [textInput, setTextInput] = useState("");

  const changeHandler = (e) => {
    setTextInput(e.target.value);
  };

  const api = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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",
    },
  });

  const generateHandler = async (e) => {
    e.preventDefault();
    setTextInput("");

    const postData = {
      prompt: textInput,
    };

    const response = await api.post("/openai", postData);
    const url = response.data;
    console.log(url);
    setImage(url);

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
        <textarea
          onChange={changeHandler}
          value={textInput}
          cols="50"
          rows="5"
        ></textarea>
        <button onClick={generateHandler}>Generate Image</button>
        <img src={image} alt="openAIImage" />
      </form>
    </div>
  );
}
