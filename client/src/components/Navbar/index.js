import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Logout";
import "./style.css";
import logo from "../../images/noob-logo.png";

const Navbar = props => {
  const { updateState, loggedIn } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-light fixed-top">
      <Link to="/" className="navbar-brand">
        <img width={50} height={50} src={logo} alt="" />
      </Link>
      <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-content">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbar-content">
        {loggedIn ? (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/question" className="nav-link">
                Ask Question
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/favourites" className="nav-link">
                Favourites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-link">
                Search for Post
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
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
      </div>
    </nav>
  );
};

export default Navbar;
