import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Logout";
import "./style.css";
import logo from "../../images/noob-logo.png";
import axios from "axios";

export default class Navbar extends Component {
  state = {
    userName: "Unkown User Name"
  };
  componentDidMount() {
    const { userId = null } = this.props;

    axios.get(`/api/user/${userId}`).then(({ data: { userName } }) => {
      this.setState({
        userName
      });
    });
  }

  render() {
    const { updateState, loggedIn } = this.props;
    const { userName } = this.state;
    const userText = {
      color: "rgb(141, 131, 137)"
    };
    const dropdownText = {
      color: "#16181b"
    };

    return (
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top custom-bg-nav">
        <Link to="/" className="navbar-brand">
          <img width={50} height={50} src={logo} alt="" />
        </Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-content">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-content">
          {loggedIn ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <NavLink exact to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <NavLink to="/question" className="nav-link">
                  Ask Question
                </NavLink>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <NavLink to="/search" className="nav-link">
                  Search for Post
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <NavLink exact to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
            </ul>
          )}
          {loggedIn ? (
            <div className="dropdown">
              <div
                className="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span style={userText}>{userName}</span>
              </div>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item">
                  <NavLink to="/profile" className="nav-link" style={dropdownText}>
                    Profile
                  </NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink to="/favourites" className="nav-link" style={dropdownText}>
                    Favourites
                  </NavLink>
                </li>
                <hr />
                <div className="dropdown-item text-center mb-2">
                  <Logout updateState={updateState} />
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <Link to="/signup">
                <button className="btn btn-primary ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-primary ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
