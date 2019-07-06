import React, { Component } from "react";
import Topics from "../Topics";

const posts = [
  {
    id: 1,
    title: "git cheat sheet",
    body: "assd asdas asdas asda d"
  },
  {
    id: 2,
    title: "css help",
    body: "jvnckjv civjus wiuef  shbv"
  },
  {
    id: 3,
    title: "react props",
    body: "awe iuf aosdio  iudfo iasdfi chifld asoidf"
  }
];

class TopicsContainer extends Component {
  state = {
    topics: { post: posts }
  };

  render() {
    return <Topics post={this.state.topics.post} />;
  }
}

export default TopicsContainer;
