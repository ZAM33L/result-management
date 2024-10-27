import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faChalkboardUser,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";

function FacultyHome() {
  const navigate = useNavigate();
  return (
    <><br />
      <MDBContainer
        fluid
        className="background-radial-gradient overflow-hidden d-flex justify-content-center align-items-center"
      >
        
        <div>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <Card style={{ width: "100%" }}>
                <Card.Body className="text-center">
                  <FontAwesomeIcon icon={faGraduationCap} size="5x" />
                  <Card.Title>Students</Card.Title>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={() => {
                      navigate("/faculty/students");
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} fade size="2xl" />
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-6 mb-3">
              <Card style={{ width: "100%" }}>
                <Card.Body className="text-center">
                  <FontAwesomeIcon icon={faChalkboardUser} size="5x" />
                  <Card.Title>Results</Card.Title>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={() => {
                      navigate("/faculty/results");
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} fade size="2xl" />
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default FacultyHome;
