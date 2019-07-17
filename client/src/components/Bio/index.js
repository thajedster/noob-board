import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import axios from "axios";
import logo from "../Navbar/noob-logo.png";
import UserPost from "../UserPost";

class Bio extends Component {
  state = {
    name: "",
    userName: "",
    email: "",
    redirect: null,
    post: []
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
        this.setState({
          post: res.data.posts
        });

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

  //TODO: create links to each post
  //store res data in array in state
  //after render, create link to
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
          <div className="userPosts">
            My Posts: <UserPost post={this.state.post} />
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
