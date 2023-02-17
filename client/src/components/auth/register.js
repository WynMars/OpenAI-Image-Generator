import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register}) => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    //why use a square bracket
    setFormdata({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={onChange}
            name="name"
          />
        </div>{" "}
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
        <div>
          <input
            type="text"
            placeholder="Confirm Password"
            name="password2"
            onChange={onChange}
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
