import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import {
  Form,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button
} from "../Utils/Utils";
import ArticleApiService from "../../Services/article-api-service";
import CategoryApiService from "../../Services/category-api-service";
import TokenService from "../../Services/token-service";
import { renderCategories } from "../Utils/Utils";

class EditArticleForm extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      image_url: {
        value: "",
        touched: false
      },
      category: {
        value: "",
        touched: false
      },
      categoriesList: []
    };
  }

  componentDidMount() {
    const { article_id } = this.props.match.params;
    ArticleApiService.getArticleById(article_id)
      .then(data => {
        return data;
      })
      .then(article => {
        this.setState({
          title: { value: article.title, touched: true },
          image_url: { value: article.image_url, touched: true },
          content: { value: article.content, touched: true },
          category: { value: article.article_category, touched: true }
        });
      });
    CategoryApiService.getAllCategories().then(categories => {
      this.setState({ categoriesList: categories });
    });
  }

  updateTitle = title => {
    this.setState({ title: { value: title, touched: true } });
  };

  updateImage_Url = image_url => {
    this.setState({ image_url: { value: image_url, touched: true } });
  };

  updateContent = content => {
    this.setState({ content: { value: content, touched: true } });
  };

  updateCategory = category => {
    this.setState({ category: { value: category, touched: true } });
  };

  handleDelete = article_id => {
    ArticleApiService.deleteArticle(article_id).then(() => {
      this.props.history.push(`/articles`);
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { article_id } = this.props.match.params;
    const { title, image_url, content, category } = this.state;
    const token = TokenService.readJwtToken();

    const updatedArticle = {
      author_id: token.user_id,
      title: title.value,
      image_url: image_url.value,
      content: content.value,
      article_category: category.value
    };

    ArticleApiService.updateArticle(updatedArticle, article_id).then(() => {
      this.props.history.push(`/articles/${article_id}`);
    });
  };

  render() {
    const { article_id } = this.props.match.params;
    const { title, image_url, content, category, categoriesList } = this.state;
    return (
      <Form
        className="EditArticleForm"
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="container_AddArticleForm_header">
          <h2>Edit post</h2>
          <div className="container_AddArticleForm_select">
            <Select
              value={category.value}
              name="category"
              onChange={e => this.updateCategory(e.target.value)}
            >
              {renderCategories(categoriesList)}
            </Select>
          </div>
        </div>

        <FormLabel
          htmlFor="EditArticleForm_article_title"
          className="label_edit_article_form"
        ></FormLabel>
        <Input
          value={title.value}
          placeholder="Top 5 Destinations for This Summer"
          name="title"
          id="EditArticleForm_article_title"
          onChange={e => this.updateTitle(e.target.value)}
        ></Input>
        <FormLabel
          htmlFor="EditArticleForm_article_image_url"
          className="label_add_article_form"
        ></FormLabel>
        <Input
          value={image_url.value}
          type="text"
          placeholder="image url"
          name="image_url"
          id="EditArticleForm_article_image_url"
          onChange={e => this.updateImage_Url(e.target.value)}
        ></Input>
        <FormLabel
          htmlFor="EditArticleForm_article_content"
          className="label_edit_article_form"
        ></FormLabel>
        <div className="container_EditArticleForm_textarea">
          <Textarea
            value={content.value}
            placeholder="For the past two years I've traveled to..."
            name="content"
            id="EditArticleForm_article_content"
            onChange={e => this.updateContent(e.target.value)}
          ></Textarea>
        </div>

        <div className="container_EditArticleForm_btn">
          <Button role="button" type="submit">
            Edit
          </Button>
          <Button
            role="button"
            type="button"
            onClick={() => this.handleDelete(article_id)}
          >
            Delete
          </Button>
          <Button
            role="button"
            type="button"
            onClick={() => this.props.history.push(`/articles/${article_id}`)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(EditArticleForm);
