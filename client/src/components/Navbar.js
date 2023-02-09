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
      </ul>
    </div>
  );
}