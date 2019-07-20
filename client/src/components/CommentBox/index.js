import React from "react";
import axios from "axios";

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: true,
      comment: "",
      user: ""
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    this.props.comments.map(comment =>
      axios.get("/api/user/" + comment.author).then(res => {
        console.log(res.data);
        this.setState({
          user: res.data
        });
      })
    );
  };

  render() {
    const { comments } = this.props;
    const { showComments } = this.state;
    const { userName } = this.state.user;

    return (
      <div id="comment-box" className="col-12 col-md-10 col-lg-8">
        <button
          id="comment-reveal"
          className={`btn btn-outline-${showComments ? "secondary" : "primary"} btn-sm float-right`}
          onClick={this._handleClick.bind(this)}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        <h3>Comments</h3>
        <h4 id="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        {showComments ? (
          <div id="comment-list">
            {comments.map(comment => (
              <div className="card mb-3" key={comment._id}>
                <div className="card-body">
                  <p className="card-text">{comment.body}</p>
                  <h5 className="card-title">
                    {userName} <span className="h6 text-muted float-right" />
                  </h5>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  } // end render

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }
}

export default CommentBox;
