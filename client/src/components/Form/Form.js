import React, { Component } from "react";

class Form extends Component {
  // Setting the component's initial state
  state = {
    Title: "",
    Question: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [Title]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.Title}
            name="Title"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Question Heading"
          />
          <input
            value={this.state.Question}
            name="Question"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter your Question"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
