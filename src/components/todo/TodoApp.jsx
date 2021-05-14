import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import Welcome from "./Welcome";
import ErrorComponent from "./ErrorComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import Todos from "./Todos";
import AuthenticatedRoute from './AuthenticatedRoute';
import UpdateTodoComponent from './UpdateTodoComponent';
import "./Todo.css";
import "./bootstrap.css";

class TodoApp extends Component {
  render() {
    return (
      <div className="todo_app">
        <Router>
          <HeaderComponent />
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
            <AuthenticatedRoute path="/welcome/:name" component={Welcome} />
            <AuthenticatedRoute path="/todo/:username/todos/:id" component={UpdateTodoComponent} />
            <AuthenticatedRoute path="/todo/:username/todos" component={Todos} />
            <Route component={ErrorComponent} />
          </Switch>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default TodoApp;