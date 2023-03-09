import React, { useState, useEffect } from "react";
import axios from "axios";

//loadier
// import ClipLoader from "react-spinners/ClipLoader";

export default function Chatbot() {
  const [textInput, setTextInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "GPT",
      message: "How can I help you today?",
    },
  ]);
  const [answer, setAnswer] = useState();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //set the current query in messages array
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        user: "Me",
        message: textInput,
        // // type: currentChatType,
        // id: !chatLog.length ? 1 : chatLog.length + 1,
      },
    ]);

    try {
      const response = await axios.post("/api/openai/chatbot", { textInput });
      // console.log(response);
      // console.log(response.data);
      setAnswer(response.data);
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          user: "GPT",
          message: response.data,
          // // type: currentChatType,
          // id: !chatLog.length ? 1 : chatLog.length + 1,
        },
      ]);
      console.log(chatLog);
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

  useEffect(() => {
    if (answer) {
      let cpyChatLog = [...chatLog];
      const findLatestId = Math.max(...chatLog.map((item) => item.id));
      const findLastChatLog = cpyChatLog.findIndex(
        (item) => item.id === findLatestId
      );

      cpyChatLog[findLastChatLog] = {
        ...cpyChatLog[findLastChatLog],
        result: answer,
      };

      setChatLog(cpyChatLog);
      setTextInput("");
      setAnswer("");
    }
  }, [answer]);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="aiContainer container-fluid">
      <form onSubmit={handleSubmit}>
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
        <div>{loading ? <p>Loading...</p> : <p>{answer}</p>}</div>
      </form>

      <div>
        {chatLog && chatLog.length > 0 ? (
          chatLog.map((item) => <p>{item.message}</p>)
        ) : (
          <p>No Result</p>
        )}
      </div>
    </div>
  );
}
