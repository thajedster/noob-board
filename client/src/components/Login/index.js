import React, { Component } from "react";
import auth from "../../utils/auth";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email: username, password } = this.state;
    auth
      .login({
        username,
        password
      })
      .then(res => {
        console.log("Logged in");
        this.setState({ email: "", password: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="row">
        <div className="col-6 mx-auto" id="login">
          <h2 className="display-4">Login Here!</h2>
          <form className="text-left" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" value={email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <input type="submit" value="Login" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
