import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import axios from "axios";
import logo from "../Navbar/noob-logo.png";

class Bio extends Component {
  state = {
    name: "",
    userName: "",
    email: "",
    redirect: null
  };

  componentWillMount() {
    const { loggedIn, userId } = this.props;

    if (!loggedIn) {
      this.setState({ redirect: "/login" });
    }

    axios
      .get(`/api/user/${userId}`)
      .then(res => {
        const { firstName, lastName, userName, email } = res.data;
        this.setState({ name: `${firstName} ${lastName}`, userName, email });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    const { loggedIn } = this.props;

    if (!loggedIn) {
      this.setState({ redirect: "/login" });
    }
  }

  render() {
    const { name, userName, email, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <div className="bio">
        <div className="card">
          <img src={logo} className="card-img-top" alt="logo" />
          <div className="card-body">
            <p className="card-text">Name: {name}</p>
            <p className="card-text">User Name: {userName}</p>
            <p className="card-text">Email: {email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
