import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../Navbar/noob-logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt={"logo"} />
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
      <Link to="/signup">
        <button className="btn btn-primary">Sign Up</button>
      </Link>
      <Link to="/login">
        <button className="btn btn-primary">Sign In</button>
      </Link>
    </div>
  );
};

export default Navbar;
