import React, { Component } from "react";
import axios from "axios";
import CommentForm from "../CommentForm";
import CommentBox from "../CommentBox";
import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    post: "",
    user: ""
  };

  componentDidMount() {
    this.loadPost();
  }

  loadPost = () => {
    let id = this.props.match.params.id;
    axios.get("/api/post/" + id).then(res => {
      this.setState({
        post: res.data
      });

      axios.get("/api/user/" + this.props.userId).then(res => {
        this.setState({
          user: res.data
        });
      });
    });
  };

  render() {
    const { _id: id, title, body, comments, createdAt } = this.state.post;
    const { loggedIn, userId } = this.props;
    const { userName } = this.state.user;
    return (
      <div>
        <h4>{title}</h4>
        <br />
        <h5>{body}</h5>
        <br />
        <h6>{userName}</h6>
        <br />
        <h6>{createdAt}</h6>
        <br />
        <Link to={"/"}>
          <button>Back</button>
        </Link>
        {loggedIn ? <CommentForm postId={id} userId={userId} refresh={this.loadPost} /> : <div />}
        {comments ? <CommentBox comments={comments} /> : <div />}
      </div>
    );
  }
}

export default Post;
