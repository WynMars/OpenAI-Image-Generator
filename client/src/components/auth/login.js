import React, { useState } from "react";

const LogIn = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const {email, password } = formData;

  const onChange = (event) => {
    //why use a square bracket
    setFormdata({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
          
        <div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </div>
      
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
