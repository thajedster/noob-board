import React, { Component } from "react";
import Topics from "../Topics";
import Axios from "axios";

class TopicsContainer extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    Axios.get("/api/post").then(response => {
      this.state.topics.push(response);
      console.log(this.state.topics);
    });
  }

  render() {
    return <Topics post={this.state.topics} />;
  }
}

export default TopicsContainer;
