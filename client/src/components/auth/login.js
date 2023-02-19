import React, { useState } from "react";
import {Navigate} from "react-router-dom"
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const Login = ({login, isAuthenticated}) => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    //why use a square bracket
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if(isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
