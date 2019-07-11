import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import "./style.css";
import logo from "../Navbar/noob-logo.png";

const Navbar = props => {
  const { updateState, loggedIn } = props;
  return (
    <nav className="navbar navbar-expand-sm">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt={"logo"} />
      </Link>
      {loggedIn ? (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/question" className="nav-link">
              Ask Question
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
      )}
      {loggedIn ? (
        <div className="navbar-nav ml-auto">
          <Logout updateState={updateState} />
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <Link to="/signup">
            <button className="btn btn-primary ml-2">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary ml-2">Sign In</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
