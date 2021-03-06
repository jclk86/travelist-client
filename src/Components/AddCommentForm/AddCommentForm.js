import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import CommentService from "../../Services/comment-api-service";
import {
  ValidationError,
  validateContent
} from "../ValidationError/ValidationError";
import PropTypes from "prop-types";
import "./AddCommentForm.css";

class AddCommentForm extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      comment: { value: "", touched: false }
    };
  }

  updateComment = comment => {
    this.setState({ comment: { value: comment, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { comment } = this.state;

    const newComment = {
      content: comment.value,
      article_id: this.props.article_id
    };

    CommentService.postComment(newComment)
      .then(this.context.addComment)
      .then(() => {
        this.setState({ comment: { value: "", touched: false } });
        this.props.history.push(`/articles/${this.props.article_id}`);
      });
  };

  isFormValid = () => {
    const { comment } = this.state;
    return comment.value;
  };
  render() {
    const { comment } = this.state;
    const isValid = this.isFormValid();
    return (
      <form
        className="AddCommentForm"
        onSubmit={event => this.handleSubmit(event)}
      >
        <label
          htmlFor="AddCommentForm_comment_title"
          className="label_add_comment_form"
        >
          Add Comment:
        </label>
        <textarea
          type="text"
          placeholder="Tell us your thoughts!"
          name="comment"
          className="AddCommentForm_comment_box"
          onChange={e => this.updateComment(e.target.value)}
          value={this.state.comment.value}
        ></textarea>
        {comment.touched && (
          <ValidationError message={validateContent(comment.value)} />
        )}
        <button
          type="submit"
          className="AddCommentForm_submit_btn"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    );
  }
}

AddCommentForm.propTypes = {
  article_id: PropTypes.string
};

export default withRouter(AddCommentForm);
