import React, { Component } from "react";
import propTypes from "prop-types";

class Counterbutton extends Component {
  constructor(props) {
    super();
    this.state = {
      button_number: props.by,
    };
  }

  render() {
    return (
      <div className="counter-button">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>
          + {this.state.button_number}
        </button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>
          - {this.state.button_number}
        </button>
      </div>
    );
  }
}


Counterbutton.propTypes = {
  by: propTypes.number,
};

export default Counterbutton;