import React, { Component } from "react";
import axios from "axios";
import Suggestions from "../Suggestions";

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  //axios call to search database
  getPost = () => {
    axios.get(`/api/post/?query=${this.state.query}`).then(response => {
      this.setState({
        results: response.data
      });
    });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getPost();
          }
        }
      }
    );
  };

  render() {
    return (
      <form>
        <input placeholder="Search for..." ref={input => (this.search = input)} onChange={this.handleInputChange} />
        <Suggestions results={this.state.results} />
        {/* <p>{this.state.query}</p> */}
      </form>
    );
  }
}

export default Search;
