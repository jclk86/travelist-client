import React, { Component } from "react";

export const nullArticle = {
  author: {},
  tags: []
};

const ArticleContext = React.createContext({
  article: nullArticle,
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setArticle: () => {},
  clearArticle: () => {},
  setComments: () => {},
  addComment: () => {}
});

export default ArticleContext;

export class ArticleProvider extends Component {
  state = {
    article: nullArticle,
    comments: [],
    error: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setArticle = article => {
    this.setState({ article });
  };

  setComments = comments => {
    this.setState({ comments });
  };

  clearArticle = () => {
    this.setArticle(nullArticle);
    this.setComments([]);
  };

  addComment = comment => {
    this.setComments([...this.state.comments, comment]);
  };

  render() {
    const contextValue = {
      article: this.state.article,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setArticle: this.setArticle,
      setComments: this.setComments,
      clearArticle: this.clearArticle,
      addComment: this.addComment
    };
    return (
      <ArticleContext.Provider value={contextValue}>
        {this.props.children}
      </ArticleContext.Provider>
    );
  }
}