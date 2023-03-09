import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";



function MainNavbar({ auth: { isAuthenticated }, logout }) {
  const authLinks = (
    <Fragment>
      <li >
        <NavLink to="/dashboard">Dashboard</NavLink>
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
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li >
        <NavLink to="/register">Register</NavLink>
      </li>
    </Fragment>
  );

  

  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/image">Image Generator</NavLink>
          </li>
          <li>
            <NavLink to="/chatbot">Chat with Us</NavLink>
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
