import React from "react";

const Login = props => {
  return (
    <div className="row">
      <div className="col-6 mx-auto" id="login">
        <h2 className="display-4">Login Here!</h2>
        <form className="text-left">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" />
          </div>
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default Login;
