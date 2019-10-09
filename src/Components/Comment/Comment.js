import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Comment.css";

class Comment extends Component {
  renderComments = (comments = []) => {
    return comments.map(comment => {
      return (
        <li key={comment.id}>
          {comment.user.username} says... <p>{comment.content}</p>
        </li>
      );
    });
  };
  render() {
    const { comments } = this.props;
    console.log(comments);
    return (
      <div className="container_comments">
        <ul>{this.renderComments(comments)}</ul>
      </div>
    );
  }
}

export default withRouter(Comment);
