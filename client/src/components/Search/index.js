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
    axios.get();
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
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
