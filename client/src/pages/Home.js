import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { HideLoding, ShowLoading } from "../redux/alerts";
import { Row, Col, Button, Container, Form, Modal } from "react-bootstrap";
import Navigation from "../components/Navigation";
import {
  faAddressBook,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "../components/contactForm";

function Home() {
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    exam: "",
    year: "",
    sem: "",
    branch: "",
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (
      searchParams.exam &&
      searchParams.year &&
      searchParams.sem &&
      searchParams.branch
    ) {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "/api/results/get-all-results",
          searchParams,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoding());

        if (response.data.success) {
          setResults(response.data.data);
          if (response.data.data.length === 0) {
            toast.warning("No Exams Found!");
          } else {
            const firstResultId = response.data.data[0]._id;
            navigate(`/result/${firstResultId}`);
          }
        } else {
          toast.error("Something Went Wrong!");
        }
      } catch (error) {
        dispatch(HideLoding());
        toast.error("No Exams Found!");
      }
    } else {
      toast.error("Please fill in all search parameters!");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navigation />
      <Container fluid>
        <div className="d-flex justify-content-around">
          <Row>
            <Col xs={12} md={6} className="text-start p-3">
              <h3 style={{ color: "#3652AD" }}>
                MOHAMED SATHAK AJ COLLEGE OF ENGINEERING
              </h3>
              <p>
                The Mohamed Sathak A.J. College of Engineering (MSAJCE),
                established on 5th July 2001 under the aegis of Mohamed Sathak
                Trust, is approved by AICTE New Delhi, affiliated to Anna
                University Chennai and Government of Tamil Nadu. MSAJCE Strives
                to continuously upgrade its facilities to provide quality
                technical education to meet the industrial and societal needs,
                by providing skill based training with the state of art
                facilities.
              </p>
              <Row>
                <Col>
                  <Button variant="dark" onClick={openModal}>
                    Exam Results
                  </Button>
                  <Button
                    variant="light"
                    href="https://www.msajce-edu.in/"
                    target="_blank"
                  >
                    Visit Us <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className="p-3">
              <h4 style={{ color: "#FF6868" }}>
                CONTACT OUR ALUMNI ASSOCIATION{" "}
                <FontAwesomeIcon icon={faAddressBook} />
              </h4>
              <hr />
              <ContactForm />
            </Col>
          </Row>
        </div>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col xs={12} md={3}>
                  <Form.Select
                    className="mb-2"
                    value={searchParams.exam}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, exam: e.target.value })
                    }
                  >
                    <option value="">Examination</option>
                    <option value="Internel Assessment Test 1">
                      Internel Assessment Test 1
                    </option>
                    <option value="Internel Assessment Test 2">
                      Internel Assessment Test 2
                    </option>
                    <option value="Internel Assessment Test 3">
                      Internel Assessment Test 3
                    </option>
                    <option value="Internel Assessment Test 4">
                      Internel Assessment Test 4
                    </option>
                    <option value="Internel Assessment Test 5">
                      Internel Assessment Test 5
                    </option>
                    <option value="Other Exams">Other Exams</option>{" "}
                  </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Select
                    className="mb-2"
                    value={searchParams.year}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, year: e.target.value })
                    }
                  >
                    <option value="">Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Select
                    className="mb-2"
                    value={searchParams.sem}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, sem: e.target.value })
                    }
                  >
                    <option value="">Semester</option>
                    <option value="Semester-1">1</option>
                    <option value="Semester-2">2</option>
                    <option value="Semester-3">3</option>
                    <option value="Semester-4">4</option>
                    <option value="Semester-5">5</option>
                    <option value="Semester-6">6</option>
                    <option value="Semester-7">7</option>
                    <option value="Semester-8">8</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Select
                    className="mb-2"
                    value={searchParams.branch}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        branch: e.target.value,
                      })
                    }
                  >
                    {" "}
                    <option value="">Deparment</option>
                    <option value="Electrical and Electronics Engineering">
                      Electrical and Electronics
                    </option>
                    <option value="Electrical and Communication Engineering">
                      Electrical and Communication
                    </option>
                    <option value="Computer Science Engineering">
                      Computer Science
                    </option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Computer Science and Busssiness System">
                      CSBS
                    </option>
                    <option value="Civil Engineering">Civil</option>
                    <option value="Mechanical Engineering">Mechanical</option>
                    <option value="AIDS ">AIDS</option>
                  </Form.Select>
                </Col>
              </Row>
              <Button onClick={handleSearch}>Search Exams</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
