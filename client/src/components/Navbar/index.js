import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Logout";
import "./style.css";
import logo from "../../images/noob-logo.png";
import axios from "axios";

export default class Navbar extends Component {
  state = {
    userName: "Guest"
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
            <div className="navbar-nav ml-auto">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle nav-link"
                  id="dropdownMenuButton"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userName}
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <li data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink to="/profile" className="dropdown-item" style={dropdownText}>
                      Profile
                    </NavLink>
                  </li>
                  <li data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink to="/favourites" className="dropdown-item" style={dropdownText}>
                      Favourites
                    </NavLink>
                  </li>
                  <div className="dropdown-divider" />
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
