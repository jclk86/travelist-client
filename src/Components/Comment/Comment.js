import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TokenService from "../../Services/token-service";
import EditCommentForm from "../EditCommentForm/EditCommentForm";
import CommentService from "../../Services/comment-api-service";
import "./Comment.css";

class Comment extends Component {
  // isEditing here for locaState
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  handleEditClick = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const token = TokenService.hasAuthToken()
      ? TokenService.readJwtToken()
      : null;
    const user_id = token ? token.user_id : null;
    const { comment } = this.props;
    console.log(`token: ${user_id} and comment user id: ${comment.user.id}`)
    return (
      <li className="list_comment_item" key={comment.id}>
        {this.state.isEditing ? (
          <EditCommentForm comment={comment} handleEditClick={this.handleEditClick}></EditCommentForm>
        ) : (
          <div className="container_comment_content">
            <span>{comment.user.username} says...</span>{" "}
            <p>{comment.content}</p>
            {user_id === comment.user.id ? (
              <div className="container_comment_btn hide">
                <button
                  type="button"
                  className="edit_comment_btn"
                  onClick={this.handleEditClick}
                >
                  Edit
                </button>
                <button type="button" className="delete_comment_btn">
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        )}
      </li>
    );
  }
}

export default withRouter(Comment);
