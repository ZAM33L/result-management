import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import {
  faBars,
  faChalkboardUser,
  faGraduationCap,
  faHouse,
  faPersonChalkboard,
  faPersonThroughWindow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DefaultLayout(props) {
  const { faculty } = useSelector((state) => state.faculty);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
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
          <Navbar.Brand href="/faculty">
            <FontAwesomeIcon icon={faPersonChalkboard} color="#C23373" />
          </Navbar.Brand>
          <Navbar.Brand href="/faculty">{faculty?.faculty}</Navbar.Brand>
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
                Home {""} <FontAwesomeIcon icon={faHouse} color="#C23373" />
              </Nav.Link>
              <Nav.Link href="/faculty/students" onClick={handleLinkClick}>
                Students {""}{" "}
                <FontAwesomeIcon icon={faGraduationCap} color="#C23373" />
              </Nav.Link>
              <Nav.Link href="/faculty/results" onClick={handleLinkClick}>
                Results {""}{" "}
                <FontAwesomeIcon icon={faChalkboardUser} color="#C23373" />
              </Nav.Link>
              <Nav.Link
                href="/login"
                className="navbar-text "
                onMouseOver={handleHover}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  handleLinkClick();
                  navigate("/login");
                }}
              >
                Log Out {``}
                <FontAwesomeIcon icon={faPersonThroughWindow} color="#C23373" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <div className="content1">{props.children}</div>
    </>
  );
}

export default DefaultLayout;
