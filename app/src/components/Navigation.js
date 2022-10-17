import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

class Navigation extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
        <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#">Photos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" onClick={()=>{this.props.changePage("",undefined,true)}}>Home</Nav.Link>
                        <Nav.Link href="#" onClick={()=>{this.props.changePage("search")}}>Search</Nav.Link>
                    </Nav>
                   
                    </Navbar.Collapse>
          </Navbar>
    );
  }
}

export default Navigation;
