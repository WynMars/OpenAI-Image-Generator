import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/image">Image Generator</Link>
        </li>
        <li>
          <Link to="/chatbot">Chat with Us</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
