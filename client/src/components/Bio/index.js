import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import logo from "../Navbar/noob-logo.png";
import Suggestions from "../Suggestions";

class Bio extends Component {
  state = {
    name: "",
    userName: "",
    email: "",
    results: []
  };

  componentDidMount() {
    const { loggedIn, userId, history } = this.props;

    if (!loggedIn) {
      return history.push("/login");
    }

    axios
      .get(`/api/user/${userId}`)
      .then(res => {
        const { firstName, lastName, userName, email } = res.data;
        this.setState({
          results: res.data.posts
        });

        this.setState({ name: `${firstName} ${lastName}`, userName, email });
      })
      .catch(error => {
        // Response
        if (error.response) {
          if (error.response.status === 401) {
            this.props.updateState({ loggedIn: false, userId: null });
            this.props.history.push("/login");
          }
          console.log("error.response");
          console.log(error);
          // Request
        } else if (error.request) {
          console.log("error.request");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error during setting up request", error.message);
        }
      });
  }

  componentDidUpdate() {
    const { loggedIn, history } = this.props;

    if (!loggedIn) {
      history.push("/login");
    }
  }

  //TODO: create links to each post
  //store res data in array in state
  //after render, create link to
  render() {
    const { name, userName, email } = this.state;
    return (
      <div className="bio">
        <div className="card">
          <img src={logo} className="card-img-top" alt="logo" />
          <div className="card-body">
            <p className="card-text">Name: {name}</p>
            <p className="card-text">User Name: {userName}</p>
            <p className="card-text">Email: {email}</p>
          </div>
          <div className="userPosts">
            My Posts: <Suggestions results={this.state.results} />
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
