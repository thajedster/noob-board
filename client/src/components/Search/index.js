import React, { Component } from "react";
import axios from "axios";
import Suggestions from "../Suggestions";

class Search extends Component {
  state = {
    query: "",
    results: [],
    showResults: false
  };

  //axios call to search database
  getPost = () => {
    axios
      .get(`/api/post/?query=${this.state.query}`)
      .then(response => {
        this.setState({
          results: response.data
        });
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

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      }
      // },
      // () => {
      //   if (this.state.query && this.state.query.length > 1) {
      //     if (this.state.query.length % 2 === 0) {
      //       this.getPost();
      //     }
      //   }
      // }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getPost();
    this.setState({ showResults: true });
  };

  render() {
    const { results, showResults } = this.state;
    return (
      <div className="row pt-5">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <form id="search" className="mb-5">
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Search for..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
              <div className="input-group-append">
                <input className="btn btn-primary" type="submit" value="Search" onClick={this.handleSubmit} />
              </div>
            </div>
          </form>
          <div id="search-results" className={showResults ? "card mb-3" : "card mb-3 d-none"}>
            <div className="card-header">Results</div>
            <Suggestions results={results} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
