import React, { Component } from "react";
import axios from "axios";

class Password extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    hasError: false,
    errorMessage: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSumbit = event => {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    const { userId } = this.props;

    this.setState({ hasError: false });
    event.preventDefault();
    //check the new password inputs
    if (newPassword !== confirmNewPassword) {
      return this.setState({
        hasError: true,
        errorMessage: "Your new passwords don't match!"
      });
    }

    const data = {
      id: userId,
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    console.log(data);

    //send the request to change the password
    axios
      .put("/api/user/password", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error.response.status === 401) {
          return this.setState({
            hasError: true,
            errorMessage: "Old Password is incorrect"
          });
        }
        console.log(error);
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-6 mx-auto">
          {this.state.hasError ? (
            <div className="text-center">
              <p className="bg-danger text-white">{this.state.errorMessage}</p>
            </div>
          ) : (
            <div />
          )}
          <h2 className="my-4">Change Password</h2>
          <form onSubmit={this.handleSumbit}>
            <input
              type="password"
              name="oldPassword"
              onChange={this.handleChange}
              className="form-control my-4"
              placeholder="Your old password"
              required
            />
            <input
              type="password"
              name="newPassword"
              onChange={this.handleChange}
              className="form-control my-4"
              placeholder="Your new password"
              required
            />
            <input
              type="password"
              name="confirmNewPassword"
              onChange={this.handleChange}
              className="form-control my-4"
              placeholder="Confirm your new password"
              required
            />
            <input type="submit" value="Change Password" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

export default Password;
