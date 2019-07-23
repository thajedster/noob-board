import React, { Component } from "react";
import auth from "../../utils/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    hasError: false
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
    const { updateState, history } = this.props;
    auth
      .login({
        username,
        password
      })
      .then(res => {
        updateState({ loggedIn: true, userId: res.data._id });
        console.log("Logged in");
        history.push("/");
      })
      .catch(err => {
        this.setState({ hasError: true });
        console.log(err);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="row">
        <div className="col-sm-10 col-md-6 mx-auto" id="login">
          {this.state.hasError ? (
            <div className="text-center">
              <p className="bg-danger text-white"> Your email or password is incorrect</p>
            </div>
          ) : (
            <div />
          )}
          <h1>Login Here!</h1>
          <form className="text-left" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={this.handleChange}
                required
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
