import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Button } from "../../Components/Utils/Utils";
import Article from "../../Components/Article/Article";
import AddCommentForm from "../../Components/AddCommentForm/AddCommentForm";
import ArticleContext from "../../Context/ArticleContext";
import ArticleApiService from "../../Services/article-api-service";
import CommentsSection from "../../Components/CommentsSection/CommentsSection";

class ArticlePage extends Component {
  static defaultProps = {
    match: { params: {} }
  };
  static contextType = ArticleContext;
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    const { article_id } = this.props.match.params; //append catches
    ArticleApiService.getArticleById(article_id).then(this.context.setArticle);
    ArticleApiService.getCommentsForArticle(article_id).then((comments) => {
      this.context.setComments(comments)
      this.setState({comments: comments})
    }
      
    );
  }

  // componentDidUpdate(props) {
  //   if(this.state.comments !== this.context.comments) {
  //     const { article_id } = this.props.match.params; 
  //   ArticleApiService.getCommentsForArticle(article_id).then(
  //     this.context.setComments
  //   );
  //   }
    
  // }
  render() {
    const { article } = this.context;
    const {comments } = this.state
    const { article_id } = this.props.match.params;

    return (
      <div className="SECTION">
        <div className="container_article_page_btn">
          <NavLink to="/articles">
            <Button role="navigation" type="button">
              Return
            </Button>
          </NavLink>
        </div>
        <Article article={article}></Article>
        <div className="container_header_comments">
          <h2>Comments Section</h2>
        </div>
        <CommentsSection comments={comments}></CommentsSection>
        <AddCommentForm article_id={article_id}></AddCommentForm>
      </div>
    );
  }
}

export default withRouter(ArticlePage);
