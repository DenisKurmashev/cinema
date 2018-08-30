import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { ADMIN, ROOT } from "../UserContent/path";

import "./Header.css";

class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      isLoginOrRegisterFetching: PropTypes.bool,
      isAuth: PropTypes.bool,
      error: PropTypes.string,
      info: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string
      })
    }),

    userActions: PropTypes.shape({
      onLoginOrRegisterFetch: PropTypes.func,
      login: PropTypes.func,
      register: PropTypes.func,
      onLogout: PropTypes.func
    })
  };

  static defaultProps = {
    user: {
      isLoginOrRegisterFetching: false,
      isAuth: false,
      error: "",
      info: {
        name: "",
        role: ""
      }
    },

    userActions: {
      onLoginOrRegisterFetch: () => {},
      login: () => {},
      register: () => {},
      onLogout: () => {}
    }
  };

  shouldComponentUpdate(nextProps) {
    const { user } = this.props;
    if (user.isAuth === nextProps.user.isAuth) {
      return false;
    }
    return true;
  }

  getCommonLinks = () => {
    return (
      <React.Fragment>
        <div className="user-bar-item">
          <Link className="btn-underline" to={ROOT}>
            Main
          </Link>
        </div>
      </React.Fragment>
    );
  };

  notAuthUserContent = () => {
    return (
      <div className="user-bar">
        {this.getCommonLinks()}
        <div className="user-bar-item">
          <Link className="btn-underline" to="/profile/register">
            Register
          </Link>
        </div>
        <div className="user-bar-item">
          <Link className="btn-underline" to="/profile/login">
            Login
          </Link>
        </div>
      </div>
    );
  };

  render() {
    const { user, onLogout } = this.props;

    if (!user.isAuth) return this.notAuthUserContent();

    const welcomeText = `Hello, ${user.info.name || "-user-"}`;

    return (
      <div className="user-bar">
        <div className="user-bar-item welcome-text">{welcomeText}</div>
        {this.getCommonLinks()}
        {user.isAuth && user.info.role === "admin" ? (
          <div className="user-bar-item">
            <Link className="btn-underline" to={ADMIN}>
              Admin
            </Link>
          </div>
        ) : null}
        <div className="user-bar-item">
          <Link className="btn-underline" to="/profile/history">
            History
          </Link>
        </div>
        <div onClick={onLogout} className="user-bar-item">
          <div className="btn-underline">Logout</div>
        </div>
      </div>
    );
  }
}

export default Header;
