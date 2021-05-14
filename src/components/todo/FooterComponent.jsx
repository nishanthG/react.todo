import React, { Component } from "react";

class FooterComponent extends Component {
  render() {
    return (
      <footer className="bg-dark">
        <div className="container">
          <p>
            All rights reserved -{" "}
            <a href="https://www.nishanthgunupudi.com">nishanth gunupudi</a>
          </p>
        </div>
      </footer>
    );
  }
}

export default FooterComponent;
