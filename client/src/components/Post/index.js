import React, { Component } from "react";
import axios from "axios";
import CommentForm from "../CommentForm";
import CommentBox from "../CommentBox";
import { Link } from "react-router-dom";

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
    const { _id: id, title, body, comments } = this.state.post;
    return (
      <div>
        <h4>{title}</h4>
        <br />
        <h5>{body}</h5>
        <br />
        <Link to={"/"}>
          <button>Back</button>
        </Link>
        {this.props.loggedIn ? <CommentForm postId={id} userId={this.props.userId} /> : <div />}
        <CommentBox comments={comments} />
      </div>
    );
  }
}

export default Post;
