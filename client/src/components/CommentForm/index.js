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
      .post("/api/comment", { body: this.state.body, post: this.props.postId, author: this.props.userId })
      .then(function(response) {
        console.log("successful");
      });
  };

  render() {
    return (
      <div className="row">
        <form className="comment">
          <input
            value={this.state.body}
            name="body"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Comment"
          />
          <button onClick={this.handleFormSubmit}>Leave your comment!</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
