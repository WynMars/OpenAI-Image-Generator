import React, { useState } from "react";
import axios from "axios";
import anywhereDoor from "../image/anywhereDoor.png";

//loadier
// import ClipLoader from "react-spinners/ClipLoader";

export default function Chatbot() {

  const [answer, setAnswer] = useState();
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputs = {
    placeholder: "Please type your image description...",
    errorMessage: "Input field cannot be empty",
    required: true,
  };

  const changeHandler = (e) => {
    setTextInput(e.target.value);
  };

  const generateHandler = async (e) => {
    e.preventDefault();
        setLoading(true);

    const postData = {
      prompt: textInput,
    };

    try {
      const response = await axios.post("/api/openai/chatbot", postData);
      console.log(Response);
      console.log(Response.data);
      setAnswer(response.data);
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
    }
    setTimeout(() => {
      setError("");
    }, 5000);
            setLoading(false);

  };
  // api
  //   .post("/openai", postData)
  //   .then((response) => {
  //     const url = response.data;
  //     console.log(url)
  //     setImage(url);

  //   });

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      <form onSubmit={generateHandler}>
        <textarea
          placeholder={inputs.placeholder}
          className="form-control"
          onChange={changeHandler}
          value={textInput}
          cols="50"
          rows="5"
          required={inputs.required}
          onBlur={handleFocus}
          focused={focused.toString()}
        ></textarea>
        <span>{inputs.errorMessage}</span>
        <button className="btn btn-dark">Generate Image</button>
        <div>
          {loading ? (
           <p>Loading...</p>
          ) : (
            <p>{answer}</p>
          )}
        </div>
      </form>
    </div>
  );
}
