import React, { Component } from "react";
import HelloWorldService from '../../api/todo/HelloWorldService'
import "./Todo.css";

class Welcome extends Component {
  constructor(props){
    super(props)
    this.state = {
      welcome: "",
      message: ''
    }
  }

  componentDidMount() {
    this.getName()
  }

  render() {
    return (
      <div className="welcome-page">
        <div className="container">
          <h1 style={{ color: "blue" }}>
            {this.state.message}
          </h1>
          <br />
          <div className="api-call">
            <p>get API response here.</p>
            <button className="btn btn-info" onClick={this.getAPIresponse}>Request API</button>
          </div>
          <div className="container">
            <p>Message from API: </p>
            <h4>{this.state.welcome}</h4>
          </div>
        </div>
      </div>
    );
  }

  getAPIresponse = () => {
    console.log('API request trigered from Component')
    HelloWorldService.triggerRequest().then(response => (this.setState({welcome:response.data.message})))
  }

  getName = () => {
    HelloWorldService.triggerPathrequest(this.props.match.params.name).then(response => this.setState({message:response.data.message}))
  }
}

export default Welcome; 