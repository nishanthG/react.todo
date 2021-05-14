import React, { Component } from "react";
import "./Todo.css";
import Authenticate from "./Auth.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showSuccess: false,
      showError: false,
    };
  }

  render() {
    return (
      <>
        <div className="container login-page">
          <br/>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder='username'
            onChange={this.onChangeHandler}
          /><br/>
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder='password'
            onChange={this.onChangeHandler}
          /><br/>
          <button className="btn btn-dark login-button" onClick={this.loginHandler}>
            login
          </button>
          <hr></hr>
        </div>
        <div className="message">
            <ShowMessage
              showSuccess={this.state.showSuccess}
              showError={this.state.showError}
            />
          </div>
      </>
    );
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // loginHandler = () => {
  //   Authenticate.executeBasicAuthService(this.state.username, this.state.password)
  //   .then(
  //     () => {
  //       this.setState({ showSuccess: true, showError: false })
  //       Authenticate.userLoggedin(this.state.username, this.state.password)
  //       this.props.history.push(`/welcome/${this.state.username}`)
  //     }
  //   )
  //   .catch(
  //     () => {
  //       this.setState({ showError: true, showSuccess: false })
  //     }
  //   )
  // }

  loginHandler = () => {
    Authenticate.executeJWTtokenAuth(this.state.username, this.state.password)
    .then(
      (response) => {
        this.setState({ showSuccess: true, showError: false })
        Authenticate.userLoggedwithJWT(this.state.username, response.data.token)
        this.props.history.push(`/welcome/${this.state.username}`)
      }
    )
    .catch(
      () => {
        this.setState({ showError: true, showSuccess: false })
      }
    )
  }
}

function ShowMessage(props) {
  if (props.showSuccess) {
    return <h4 className="alert alert-success">Login Sucessful</h4>;
  }

  if (props.showError) {
    return <h4 className="alert alert-danger">Invalid Login</h4>;
  }

  return null;
}

export default LoginComponent;
