import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserApiService from "../../Services/user-api-service";
import UserContext from "../../Context/UserContext";
import "./UserProfile.css";

class UserProfile extends Component {
  static contextType = UserContext;
  componentDidMount() {
    this.context.clearError();
    const { username } = this.props.match.params;
    UserApiService.getUserProfile(username)
      .then(this.context.setUser)
      .catch(this.context.setError);
  }

  render() {
    const { user, error } = this.context;
    return (
      <div className="container_user_profile">
        {error ? (
          <p className="error_message_no_user">{error.error}</p>
        ) : (
          <div className="container_user_profile_section">
            <div className="container_user_profile_image">
              <img
                src={user.image_url}
                alt={user.fullname}
                className="profile_image"
              ></img>
            </div>
            <div className="container_user_profile_info" role="main">
              <h1 className="user_profile_header">{user.fullname}</h1>
              <p>{user.profile}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(UserProfile);
