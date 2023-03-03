import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";



function MainNavbar({ auth: { isAuthenticated }, logout }) {
  const authLinks = (
    <Fragment>
      <li >
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li >
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li >
        <Link to="/login">Log In</Link>
      </li>
      <li >
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  );

  

  return (
    <nav className="navbar bg-dark ">
 
        <ul>
          <li>
            <Link to="/image">Image Generator</Link>
          </li>
          <li>
            <Link to="/chatbot">Chat with Us</Link>
          </li>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>

    </nav>
  );
}

MainNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(MainNavbar);
