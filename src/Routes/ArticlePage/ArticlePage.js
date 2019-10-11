import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Article from "../../Components/Article/Article";
import ArticleContext from "../../Context/ArticleContext";
import ArticleApiService from "../../Services/article-api-service";
import Comment from "../../Components/Comment/Comment";

class ArticlePage extends Component {
  static defaultProps = {
    match: { params: {} }
  };
  static contextType = ArticleContext;

  componentDidMount() {
    const { article_id } = this.props.match.params; //append catches
    ArticleApiService.getArticleById(article_id).then(this.context.setArticle);
    ArticleApiService.getCommentsForArticle(article_id).then(
      this.context.setComments
    );
  }
  render() {
    const { article, comments } = this.context;

    return (
      <div className="SECTION">
        <Article article={article}></Article>
        <div className="container_header_comments">
          <h2>Comments Section</h2>
        </div>
        <Comment comments={comments}></Comment>
      </div>
    );
  }
}

export default withRouter(ArticlePage);