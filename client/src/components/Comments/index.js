import React, { Component } from "react";
import axios from "axios";

class CommentForm extends Component {
  // Setting the component's initial state
  state = {
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
    axios
      .post("/api/comment", { body: this.state.body })
      .then(function(response) {
        console.log("successful");
      });
  };

  render() {
    return (
      <div>
        <form className="comment">
          <input
            value={this.state.body}
            name="Comment"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter your Comment"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;


   
  
 