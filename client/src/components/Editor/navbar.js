import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navigation() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/editor/dasboard">RSS FEED</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Nav>
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="/editor/profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#"  onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default Navigation;