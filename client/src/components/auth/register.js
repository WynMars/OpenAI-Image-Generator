import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";


const Register = ({ setAlert, register, isAuthenticated}) => {
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
      register(formData);
    }
  };

    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Create Your Account</h3>
        <div>
          <input
            class="inputLength"
            type="text"
            placeholder="Name"
            onChange={onChange}
            name="name"
          />
        </div>{" "}
        <div>
          <input
            class="inputLength"
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            class="inputLength"
            type="text"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            class="inputLength"
            type="text"
            placeholder="Confirm Password"
            name="password2"
            onChange={onChange}
          />
        </div>
        <button className="btn btn-dark">Register</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);







