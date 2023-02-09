import React, { useState } from "react";
import axios from "axios";

//loadier
// import ClipLoader from "react-spinners/ClipLoader";

export default function Chatbot() {

  const [answer, setAnswer] = useState();
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputs = {
    placeholder: "Ask your question...",
    errorMessage: "Input field cannot be empty",
    required: true,
  };

  const changeHandler = (e) => {
    setTextInput(e.target.value);
  };

  const generateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/openai/chatbot", {textInput});
      
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
        <button className="btn btn-dark">Chat</button>
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
