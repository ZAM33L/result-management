import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRegistered,
  faRightToBracket,
  faBars,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Nav, Navbar } from "react-bootstrap";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary p-2">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faSchool} color="#C23373" />
          </Navbar.Brand>
          <Navbar.Brand href="/">MSAJCE</Navbar.Brand>
          <button
            className={`navbar-toggler ${isMenuOpen ? "collapsed" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#basic-navbar-nav"
            aria-controls="basic-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />{" "}
          </button>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" onClick={handleLinkClick}>
                HOME {""} <FontAwesomeIcon icon={faHouse} color="#C23373" />
              </Nav.Link>
              <Nav.Link href="/login" onClick={handleLinkClick}>
                LOGIN {""}{" "}
                <FontAwesomeIcon icon={faRightToBracket} color="#C23373" />
              </Nav.Link>
              <Nav.Link href="/register" onClick={handleLinkClick}>
                REGISTER {""}{" "}
                <FontAwesomeIcon icon={faRegistered} color="#C23373" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Navigation;
