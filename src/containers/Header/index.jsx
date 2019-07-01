import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class Header extends Component {
  static state = {
    startDate: new Date(),
    endDate: new Date(),
    reports: []
  };
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Adventure Links</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
