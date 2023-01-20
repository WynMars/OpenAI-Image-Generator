import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GenerateImage() {
  const [image, setImage] = useState("");
  const [textInput, setTextInput] = useState("");

  // const api = axios.create({
  //   baseURL: '/api',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer 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'
  //   }
  // });

  const changeHandler = (e) => {
    setTextInput(e.target.value);
  };

  const generateHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/openai", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        prompt: { textInput },
      })
      .then((data) => {
        console.log(data.image_url);
        setImage(data.image_url);
      })
      .catch((error) => console.log(error));

    setTextInput("");
  };

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
        <h1>{image}</h1>
      </form>
    </div>
  );
}
