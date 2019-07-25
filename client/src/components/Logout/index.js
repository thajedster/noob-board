import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth from "../../utils/auth";

class Logout extends Component {
  handleClick = e => {
    const { updateState, history } = this.props;
    auth
      .logout()
      .then(res => {
        updateState({ loggedIn: false, userId: null });
        console.log("Logged out");
        history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <button
        className="dropdown-item"
        onClick={this.handleClick}
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        Sign Out
      </button>
    );
  }
}

export default withRouter(Logout);
