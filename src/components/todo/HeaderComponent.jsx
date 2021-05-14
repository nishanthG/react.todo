import React, { Component } from "react";
import { Link } from "react-router-dom";
import Authenticate from "./Auth.js";
import { withRouter } from "react-router";

class HeaderComponent extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href="https://www.nishanthgunupudi.com">
            TODO.app
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {sessionStorage.getItem("userAuthenticated") && (
                <li>
                  <Link className="nav-link" to={"/welcome/"+ sessionStorage.getItem("username")}>
                    Home
                  </Link>
                </li>
              )}
              {sessionStorage.getItem("userAuthenticated") && (
                <li>
                  <Link className="nav-link" to={"/todo/"+ sessionStorage.getItem("username") +"/todos"}>
                    Todo
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!sessionStorage.getItem("userAuthenticated") && (
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {sessionStorage.getItem("userAuthenticated") && (
                <li>
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={Authenticate.logout}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);
