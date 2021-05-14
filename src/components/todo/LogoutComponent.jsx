import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Todo.css";

class LogoutComponent extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h2>You are logged out Successfully!</h2>
          <p>
            To login, <Link to="/login">click here</Link>
          </p>
        </div>
      </>
    );
  }
}

export default LogoutComponent;
