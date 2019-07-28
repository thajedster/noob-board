import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import CommentForm from "../CommentForm";
import CommentBox from "../CommentBox";

class Post extends Component {
  state = {
    post: { author: {} },
    ownPost: false
  };

  componentDidMount() {
    this.loadPost();
  }

  loadPost = () => {
    let id = this.props.match.params.id;
    axios
      .get("/api/post/" + id)
      .then(res => {
        this.setState({
          post: res.data
        });
        this.isOwnPost();
      })
      .catch(error => {
        // Response
        if (error.response) {
          if (error.response.status === 401) return window.location.replace("/login");
          else if (error.response.status === 404) return this.setState({ error: "404 Post not Found" });
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

  isOwnPost = () => {
    const { author } = this.state.post;
    const { userId } = this.props;
    if (author._id === userId) {
      this.setState({ ownPost: true });
    }
  };

  deletePost = () => {
    const { history } = this.props;
    let id = this.props.match.params.id;
    axios
      .delete("/api/post/" + id)
      .then(res => {
        history.replace("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { _id: id, title, body, comments, createdAt, author } = this.state.post;
    const { loggedIn, userId, history } = this.props;
    const { ownPost, error } = this.state;
    return (
      <div className="row pt-3">
        {error ? (
          <div className="col-12 col-md-8 mx-auto">
            <div className="alert alert-danger bg-danger text-white text-center">{error}</div>
          </div>
        ) : (
          <div className="col-12 col-md-8 mx-auto">
            <div id="post" className="card custom-bg-secondary">
              <div className="card-body">
                <h2>{title}</h2>
                <h6 className="text-muted">
                  by {author.userName} at <Moment format="dddd, MMMM Do YYYY, h:mm a">{createdAt}</Moment>
                </h6>
                <p>{body}</p>
                <button className="btn btn-link pl-0 text-decoration-none" onClick={history.goBack}>
                  <i className="fas fa-chevron-left" /> Go Back
                </button>
                {ownPost ? (
                  <div id="post-actions" className="float-right">
                    <button className="btn btn-link" title="Edit Post" onClick={this.editPost}>
                      <i className="far fa-edit" />
                    </button>
                    <button className="btn btn-link text-danger" title="Delete Post" onClick={this.deletePost}>
                      <i className="far fa-trash-alt" />
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
            <hr />
            {loggedIn ? <CommentForm postId={id} userId={userId} refresh={this.loadPost} /> : <div />}
            {comments ? <CommentBox comments={comments} /> : <div />}
          </div>
        )}
      </div>
    );
  }
}

export default Post;
