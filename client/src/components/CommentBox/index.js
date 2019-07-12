import React from "react";

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: true
    };
  }

  render() {
    const { comments } = this.props;
    const { showComments } = this.state;

    return (
      <div className="comment-box">
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        {showComments ? (
          <div className="comment-list">
            {comments.map(comment => (
              <div key={comment._id}>{comment.body}</div>
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
