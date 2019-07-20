import React from "react";
import "./style.css";
import axios from "axios";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    userName: "",
    firstName: "",
    lastName: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateState, history } = this.props;
    axios
      .post("/signup", {
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(res => {
        updateState({ loggedIn: true, userId: res.data._id });
        history.push("/");
      })
      .catch(function(err) {
        //TODO: error handling
        //create handle for email with no @ (regex)
        console.log(err);
      });
  };

  render() {
    return (
      <div className="row">
        <div className="jumbotron jumbotron-fluid" id="sign">
          <div className="container">
            <h2 className="display-4">Sign Up Now!</h2>
            <form className="userForm">
              <label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="userName"
                  placeholder=" Username"
                  onChange={this.handleChange}
                  value={this.state.userName}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </label>
              <br />
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </label>
              <br />
              <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
