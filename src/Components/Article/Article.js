import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import TokenService from "../../Services/token-service";
import { Button } from "../Utils/Utils";
import { DateFormatter } from "../Utils/Utils";
import PropTypes from "prop-types";
import "./Article.css";

class Article extends Component {
  static contextType = ArticleContext;

  render() {
    const { article } = this.props;
    const token = TokenService.readJwtToken();
    return (
      <div className="container_article">
        <div className="container_article_image">
          <img
            src={article.image_url}
            alt="user-posted"
            className="article_image"
          ></img>
        </div>
        <h2>{article.title}</h2>
        <p>{DateFormatter(article.date_created)}</p>
        <p>
          <span>By</span> {article.author.username}
        </p>
        <p>{article.content}</p>
        {token.user_id === article.author.id ? (
          <NavLink to={`/articles/${article.id}/edit_article`}>
            <Button type="button">Edit Post</Button>
          </NavLink>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    date_created: PropTypes.string
  })
};

export default withRouter(Article);
