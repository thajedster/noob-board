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
        console.log(name, value);
        this.setState({
            [name]: value
        });
    };

<<<<<<< HEAD
    handleSubmit = event => {
        event.preventDefault();
        axios.post('/signup', {
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })
            .then(() =>
                this.setState({
                    email: "",
                    password: "",
                    userName: "",
                    firstName: "",
                    lastName: ""
                })
            )
            .catch(err =>
                ( if (err) throw err)
            )


    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid" id="sign">
                <div className="container">
                    <h2 className="display-4">Sign Up Now!</h2>
                    <form className="userForm">
                        <label>
                            First Name:
                    <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} />
                        </label><br />
                        <label>
                            Last Name:
                    <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} />
                        </label><br />
                        <label>
                            Username:
                    <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName} />
                        </label><br />
                        <label>
                            E-mail:
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
                        </label><br />
                        <label>
                            Password:
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                        </label><br />
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    </form>
                </div>
            </div>
        )
    }
=======
  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/signup", {
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(function(res) {
        console.log("new user created");
      });
  };

  render() {
    return (
      <div className="row">
        <div className="jumbotron jumbotron-fluid" id="sign">
          <div className="container">
            <h2 className="display-4">Sign Up Now!</h2>
            <form>
              <label>
                First Name:
                <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} />
              </label>
              <br />
              <label>
                Last Name:
                <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} />
              </label>
              <br />
              <label>
                Username:
                <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName} />
              </label>
              <br />
              <label>
                E-mail:
                <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
              </label>
              <br />
              <label>
                Password:
                <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
              </label>
              <br />
              <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
>>>>>>> 09bc308280567ecd180d715938a76968adfb0344
}

export default Signup;
