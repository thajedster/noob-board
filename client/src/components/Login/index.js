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
      <div className="row pt-3">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto" id="login">
          {this.state.hasError ? (
            <div className="alert alert-danger bg-danger text-white text-center">
              Your email or password is incorrect
            </div>
          ) : (
            <div />
          )}
          <h2 className="my-4">Login Here!</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control my-4 custom-bg-secondary border-secondary"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control my-4 custom-bg-secondary border-secondary"
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
