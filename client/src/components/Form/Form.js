import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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
    axios.post("/api/post", { title: title, body: body, author: userId }).then(response => {
      console.log("successful");
    });
  };

  render() {
    const { title, body, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <div>
        <form className="form">
          <input
            value={title}
            name="title"
            onChange={this.handleInputChange}
            type="text"
            placeholder="What is your question?"
          />
          <input
            value={body}
            name="body"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Give details here!"
          />
          <button onClick={this.handleFormSubmit}>Ask Question!</button>
        </form>
      </div>
    );
  }
}

export default Form;
