import React, { Component } from "react";
import axios from "axios";

class Password extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    hasError: false,
    errorMessage: "",
    successful: false
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

    this.setState({ hasError: false, successful: false });
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
        this.setState({ successful: true });
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
      <div className="row pt-3">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          {this.state.hasError ? (
            <div className="alert alert-danger bg-danger text-white text-center">{this.state.errorMessage}</div>
          ) : (
            <div />
          )}
          {this.state.successful ? (
            <div className="alert alert-success bg-success text-white text-center">Your password has been changed.</div>
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
              minLength="5"
              required
            />
            <input
              type="password"
              name="confirmNewPassword"
              onChange={this.handleChange}
              className="form-control my-4"
              placeholder="Confirm your new password"
              minLength="5"
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
