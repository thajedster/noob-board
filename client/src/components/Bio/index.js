import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import avatar from "../../images/avatar.svg";
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
      .catch(err => {
        console.log(err);
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
    const { name, userName } = this.state;
    return (
      <div className="row pt-3">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div id="bio" className="card mb-3">
            <div className="row no-gutters">
              <div className="col-4">
                <img width={100} height={100} src={avatar} className="avatar" alt="" />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-text">{name}</h5>
                  <h6 className="card-text text-muted">@{userName}</h6>
                </div>
              </div>
            </div>
          </div>
          <div id="userPosts" className="card mb-3">
            <div className="card-header">Your Posts</div>
            <Suggestions results={this.state.results} />
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
