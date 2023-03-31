import React, { useState} from "react";
import axios from "axios";

export default function Chatbot() {

  const [textInput, setTextInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user:"GPT",
    message:"How can I help you today?"
  }]);

  
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
        message:textInput,
        // // type: currentChatType,
        // id: !chatLog.length ? 1 : chatLog.length + 1,
      },
    ]);

    try {
      const response = await axios.post("/api/openai/chatbot", { textInput });
      // console.log(response);
      // console.log(response.data);
      // setAnswer(response.data);
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

  // useEffect(() => {
  //   if (answer) {
  //     let cpyChatLog = [...chatLog];
  //     const findLatestId = Math.max(...chatLog.map((item) => item.id));
  //     const findLastChatLog = cpyChatLog.findIndex(
  //       (item) => item.id === findLatestId
  //     );

  //     cpyChatLog[findLastChatLog] = {
  //       ...cpyChatLog[findLastChatLog],
  //       result: answer,
  //     };

  //     setChatLog(cpyChatLog);
  //     setTextInput("");
  //     setAnswer("");
  //   }
  // }, [answer]);





  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
    
      <section className="log-area">
        <div>
          {chatLog && chatLog.length > 0 ? (
            chatLog.map((item, index) => (
              <div className="chat-box">
                {item.user === "GPT" ? (
                  <i className="fa-solid fa-robot"></i>
                ) : (
                  <i className="fa-solid fa-circle-user"></i>
                )}

                <span index={index}> {item.message}</span>
              </div>
            ))
          ) : (
            <p>No Result</p>
          )}
        </div>
        <div>{loading ? <p>Loading...</p> : ""}</div>
      </section>

        <form className="chat-log"  onSubmit={handleSubmit}>
          <textarea
            placeholder={inputs.placeholder}
            className="form-control "
            onChange={changeHandler}
            value={textInput}
            rows="2"
            required={inputs.required}
            onBlur={handleFocus}
            focused={focused.toString()}
          ></textarea>

          <button className="btn btn-dark chatbot-input-button">Chat</button>
          {/* <span className="error-span">{inputs.errorMessage}</span> */}
        </form>
    </div>
  );
}
