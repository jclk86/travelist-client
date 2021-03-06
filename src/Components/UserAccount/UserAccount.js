import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import UserApiService from "../../Services/user-api-service";
import TokenService from "../../Services/token-service";
import { Button } from "../Utils/Utils";
import UserContext from "../../Context/UserContext";
import "./UserAccount.css";

class UserAccount extends Component {
  static contextType = UserContext;
  componentDidMount() {
    UserApiService.getUserAccount().then(this.context.setUser);
  }

  render() {
    const { user } = this.context;
    const token = TokenService.readJwtToken();
    return (
      <div className="container_user_account">
        <div className="container_UserAccount_profile">
          <div className="container_user_account_image">
            {" "}
            <img
              src={user.image_url}
              alt={user.fullname}
              className="account_image"
            ></img>
          </div>
          <div className="container_user_account_info">
            <h1 className="user_account_header">{user.fullname}</h1>
            <p className="user_profile_text">{user.profile}</p>
          </div>
        </div>
        <div className="container_UserAccount_edit_btn">
          {token.user_id === user.id ? (
            <NavLink to="/edit_account">
              <Button
                type="button"
                role="navigation"
                className="UserAccount_edit_btn"
              >
                Edit Account
              </Button>
            </NavLink>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(UserAccount);
