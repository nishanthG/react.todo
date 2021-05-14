import React, { Component } from "react";
import Counterbutton from "./Counterbutton";
import "./Counter.css";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        <div className="Counter">
          <Counterbutton
            by={+1}
            incrementMethod={this.increment_callHandler}
            decrementMethod={this.decrement_callHandler}
          />
          <Counterbutton
            by={+5}
            incrementMethod={this.increment_callHandler}
            decrementMethod={this.decrement_callHandler}
          />
          <Counterbutton
            by={10}
            incrementMethod={this.increment_callHandler}
            decrementMethod={this.decrement_callHandler}
          />
          <Counterbutton
            by={100}
            incrementMethod={this.increment_callHandler}
            decrementMethod={this.decrement_callHandler}
          />
        </div>
        <div className="count">
          <h4>{this.state.counter}</h4>
        </div>
        <div>
          <button onClick={this.reset.bind(this)} className="reset">
            {" "}
            reset{" "}
          </button>
        </div>
      </div>
    );
  }

  increment_callHandler = (value) => {
    console.log(`incrementing count by: ${value}`);
    this.setState({
      counter: this.state.counter + value,
    });
  };

  decrement_callHandler = (value) => {
    console.log(`decrementing count by: ${value}`);
    this.setState({
      counter: this.state.counter - value,
    });
  };

  reset() {
    this.setState({
      counter: 0,
    });
  }
}

export default Counter;
