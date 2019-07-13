import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  // Setting the component's initial state
  state = {
    title: "",
    body: ""
  };

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
    axios.post("/api/post", { title: this.state.title, body: this.state.body }).then(response => {
      console.log("successful");
    });
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
            type="text"
            placeholder="What is your question?"
          />
          <input
            value={this.state.body}
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
