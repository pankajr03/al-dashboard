import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  static state = {
    startDate: new Date(),
    endDate: new Date(),
    reports: [],
  }
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Adventure Links</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown eventKey={3} title="Reports" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Camp Photos</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown eventKey={3} title="Camp Docs" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Sign-In</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
