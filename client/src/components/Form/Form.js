import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";

class Form extends Component {
  // Setting the component's initial state
  state = {
    title: "",
    body: "",
    redirect: null
  };

  componentWillMount() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      this.setState({ redirect: "/login" });
    }
  }

  componentDidUpdate() {
    const { loggedIn } = this.props;

    if (!loggedIn) {
      this.setState({ redirect: "/login" });
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
    const { userId } = this.props;
    axios.post("/api/post", { title: title, body: body, author: userId }).then(({ data }) => {
      this.setState({ redirect: `/post/${data._id}` });
    });
  };

  render() {
    const { title, body, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <div className="row">
        <div className="col-4 text-center mx-auto">
          <h2>Ask a Question!</h2>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input
                className="form-control form-control-lg"
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
                className="form-control form-control"
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
