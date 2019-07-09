import React from "react";
import "./style.css";
import axios from "axios";
import logo from "../Navbar/noob-logo.png";

class Bio extends React.Component {
  state = {
    name: "",
    userName: "",
    email: ""
  };

  componentWillMount() {
    axios.get("/api/user").then(response => {
      const name = `${response.data[0].firstName} ${response.data[0].lastName}`;
      const userName = response.data[0].userName;
      const email = response.data[0].email;

      this.setState({ name: name, userName: userName, email: email });
    });
  }

  render() {
    return (
      <div className="bio">
        <div className="card">
          <img src={logo} className="card-img-top" alt="logo" />
          <div className="card-body">
            <p className="card-text">Name: {this.state.name}</p>
            <p className="card-text">User Name: {this.state.userName}</p>
            <p className="card-text">Email: {this.state.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
