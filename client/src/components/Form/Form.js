import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class Form extends Component {
  // Setting the component's initial state
  state = {
    title: "",
    body: ""
  };

  componentDidMount() {
    const { loggedIn, history } = this.props;
    if (!loggedIn) {
      history.push("/login");
    }
  }

  componentDidUpdate() {
    const { loggedIn, history } = this.props;

    if (!loggedIn) {
      history.push("/login");
    }
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    const { title, body } = this.state;
    const { userId, history } = this.props;
    axios
      .post("/api/post", { title: title, body: body, author: userId })
      .then(({ data }) => {
        history.push(`/post/${data._id}`);
      })
      .catch(error => {
        // Response
        if (error.response) {
          if (error.response.status === 401) return window.location.replace("/login");
          console.log("error.response");
          console.log(error);
          // Request
        } else if (error.request) {
          console.log("error.request");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error during setting up request", error.message);
        }
      });
  };

  render() {
    const { title, body } = this.state;
    return (
      <div className="row pt-3">
        <div className="col-12 col-md-8 col-lg-6 text-center mx-auto">
          <h2>Ask a Question!</h2>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input
                className="form-control form-control-lg custom-bg-secondary border-secondary"
                value={title}
                name="title"
                onChange={this.handleInputChange}
                type="text"
                placeholder="What is your question?"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                id="newPostBody"
                className="form-control form-control custom-bg-secondary border-secondary"
                value={body}
                name="body"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Give details here!"
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Post It!" />
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
