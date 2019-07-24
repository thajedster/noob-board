import React, { Component } from "react";
import auth from "../../utils/auth";

class Logout extends Component {
  handleClick = e => {
    auth
      .logout()
      .then(res => {
        this.props.updateState({ loggedIn: false, userId: null });
        console.log("Logged out");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <li
        // className="btn btn-primary ml-2"
        onClick={this.handleClick}
        // data-toggle="collapse"
        // data-target=".navbar-collapse.show"
      >
        Sign Out
      </li>
    );
  }
}

export default Logout;
