import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  state = {
    post: ""
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get("/api/post/" + id).then(res => {
      this.setState({
        post: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <h4>{this.state.post.title}</h4>
        <br />
        <h5>{this.state.post.body}</h5>
        <br />
        <input type="text" name="comment" className="commentbox" />
      </div>
    );
  }
}

export default Post;
