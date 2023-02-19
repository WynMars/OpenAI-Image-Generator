import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

function Navbar({ auth: { isAuthenticated }, logout }) {
  const authLinks = (
    <div>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </div>
  );

  const guestLinks = (
    <div>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </div>
  );

  return (
    <div>
      <ul>
        <li>
          <Link to="/image">Image Generator</Link>
        </li>
        <li>
          <Link to="/chatbot">Chat with Us</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
