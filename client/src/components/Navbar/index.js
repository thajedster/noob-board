import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../Navbar/noob-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt={"logo"} />
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/question" className="nav-link">
            Ask Question
          </Link>
        </li>
      </ul>
      <div className="navbar-nav ml-auto">
        <Link to="/signup">
          <button className="btn btn-primary ml-2">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary ml-2">Sign In</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
