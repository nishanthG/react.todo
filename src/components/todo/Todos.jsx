import React, { Component } from "react";
import "./Todo.css";
import TodoService from "../../api/todo/TodoService";
import Authenticate from "./Auth.js";
import moment from "moment";
import { Field, Form, Formik, ErrorMessage } from "formik";

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        // {
        //   id: 1,
        //   description: "Learn React",
        //   completed: false,
        //   date: new Date(),
        // },
        // {
        //   id: 2,
        //   description: "Make protfolio website",
        //   completed: false,
        //   date: new Date(),
        // },
        // {
        //   id: 3,
        //   description: "Make a storage app",
        //   completed: false,
        //   date: new Date(),
        // },
        // {
        //   id: 4,
        //   description: "Do freelancing",
        //   completed: false,
        //   date: new Date(),
        // },
        // {
        //   id: 5,
        //   description: "Earn money",
        //   completed: false,
        //   date: new Date(),
        // },
      ],
      message: null,
      description: "",
      date: "",
      showTodo: false,
    };
  }

  componentDidMount() {
    this.reload_render();
  }

  reload_render = () => {
    let username = Authenticate.currentUser();
    TodoService.get_user_todos(username).then((response) =>
      this.setState({
        todos: response.data,
      })
    );
  };

  validateFeilds = (values) => {
    let errors = {};

    if (!values.description) {
      errors.description = "Enter a valid description";
    } else if (!moment(values.date).isValid()) {
      errors.date = "Enter a valid date";
    } else if (values.description.length < 5) {
      errors.description = "Description should be more than 5 charecters";
    }
    return errors;
  };

  onSubmit = (values) => {
    console.log(values);
    let username = Authenticate.currentUser()

    TodoService.add_todo(username, {
      'description': values.description,
      'date': values.date,
      'username': username,
      'done': false
    })
    .then(() => this.reload_render())
    .then(this.setState({showTodo: false}))
  }

  addTodo = () => {
    this.setState({ showTodo: true });
    document.getElementById('add-todo').scrollIntoView()
  };

  render() {
    let description = this.state.description;
    let date = this.state.date;

    return (
      <>
        <h1 className="todo-container">My Todos</h1>
        <div className="container table-responsive todo-container">
          {this.state.message && (
            <p className="alert alert-success">{this.state.message}</p>
          )}
          <table className="table table-striped table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Description</th>
                <th>Completed</th>
                <th>Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{moment(todo.date).format("YYYY-MM-DD")}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.updateHandler(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteHandler(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container todo-container todo-button-xtra">
          <button className="btn btn-success" onClick={this.addTodo}>
            Add a Todo
          </button>
        </div>
        <div className="container todo-container" id="add-todo">
          {this.state.showTodo && (
            <>
              <hr/>
            <div className="container w-100">
              <Formik
                initialValues={{ description, date }}
                validate={this.validateFeilds}
                onSubmit={this.onSubmit}
              >
                <Form>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-warning"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="form-group">
                    <label>Description</label>
                    <Field
                      className="form-control"
                      name="description"
                      type="text"
                    ></Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Date</label>
                    <Field
                      className="form-control"
                      name="date"
                      type="date"
                    ></Field>
                  </fieldset>
                  <button className="btn btn-info todo-button" type="submit">
                    Add Todo
                  </button>
                </Form>
              </Formik>
            </div>
            </>
          )}
        </div>
      </>
    );
  }

  deleteHandler = (id) => {
    let username = Authenticate.currentUser();
    TodoService.delete_todo(id, username).then((response) => {
      this.setState({ message: `Deleted ${id}'st todo` });
      this.reload_render();
    });
  };

  updateHandler = (id) => {
    let username = Authenticate.currentUser();
    this.props.history.push(`/todo/${username}/todos/${id}`);
  };
}

export default Todos;
