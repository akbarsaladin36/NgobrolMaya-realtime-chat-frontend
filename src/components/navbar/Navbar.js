import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "./NavbarStyle.module.css";

function ChatNavbar() {
  return (
    <div>
      <Navbar className={styles.navbar_background_color} bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="text-light">
            NgobrolMaya
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="text-light" href="/login">
                Login
              </Nav.Link>
              <Nav.Link className="text-light" href="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default ChatNavbar;
