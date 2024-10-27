import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTittle";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoding, ShowLoading } from "../../redux/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);
  const [searchRoll, setSearchRoll] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [searchSemester, setSearchSemester] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getStudents = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {
          branch: searchBranch,
          sem: searchSemester,
          year: searchYear,
          roll: searchRoll,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  const deleteStudents = async (roll) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/delete-student/${roll}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        getStudents();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, [searchBranch, searchSemester, searchYear]);
  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  const totalStudents = students.length;

  return (
    <>
      <div>
        <PageTitle title="Students" />
        <div className="container">
          <Form>
            <Row>
              <Col>
                <InputGroup className="p-2">
                  <Form.Control
                    placeholder="Branch"
                    as="select"
                    value={searchBranch}
                    onChange={(e) => setSearchBranch(e.target.value)}
                  >
                    <option value="">Department</option>
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
                  </Form.Control>
                </InputGroup>{" "}
                <InputGroup className="p-2">
                  <Form.Control
                    placeholder="Year"
                    as="select"
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>{" "}
                  </Form.Control>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="p-2">
                  <Form.Control
                    placeholder="Semester"
                    as="select"
                    value={searchSemester}
                    onChange={(e) => setSearchSemester(e.target.value)}
                  >
                    <option value="">Semester</option>
                    <option value="Semester-2">2</option>
                    <option value="Semester-3">3</option>
                    <option value="Semester-4">4</option>
                    <option value="Semester-5">5</option>
                    <option value="Semester-6">6</option>
                    <option value="Semester-7">7</option>
                    <option value="Semester-8">8</option>{" "}
                  </Form.Control>
                </InputGroup>{" "}
                <InputGroup className="p-2">
                  <Form.Control
                    placeholder="ROLL NO"
                    aria-label="ROLL NO"
                    aria-describedby="basic-addon1"
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                  />
                  <Button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  getStudents()
                }}
                id="search-addon"
              ><FontAwesomeIcon icon={faSearch} /></Button>
                </InputGroup>
              </Col>
              <Row className="text-center mt-3">
                <i>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/faculty/students/add");
                    }}
                  >
                    Add a New Student ?{" "}
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </button>
                </i>
              </Row>
            </Row>
          </Form>
          <br/>
          <MDBTable responsive>
            <MDBTableHead>
              <tr >
                <th style={{ border: "1px solid black",color:'#C23373' }} scope="col">
                  <i>Register Number</i>
                </th>
                <th style={{ border: "1px solid black",color:'#C23373' }} scope="col">
                  <i>Name</i>
                </th>
                <th style={{ border: "1px solid black",color:'#C23373' }} scope="col">
                  <i>Year</i>
                </th>
                <th style={{ border: "1px solid black",color:'#C23373' }} scope="col">
                  <i>Semester</i>
                </th>
                <th style={{ border: "1px solid black",color:'#C23373' }} scope="col">
                  <i>Department</i>
                </th>
                <th style={{ border: "1px solid black",color:'#C23373' }} scope="col">
                  <i>Action</i>
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {students
                .slice(
                  (pagination.current - 1) * pagination.pageSize,
                  pagination.current * pagination.pageSize
                )
                .map((student, index) => (
                  <tr style={{ border: "1px solid black" }} key={index}>
                    <td style={{ border: "1px solid black" }}>{student.roll}</td>
                    <td style={{ border: "1px solid black" }}>{student.name}</td>
                    <td style={{ border: "1px solid black" }}>{student.year}</td>
                    <td style={{ border: "1px solid black" }}>{student.sem}</td>
                    <td style={{ border: "1px solid black" }}>{student.branch}</td>
                    <td>
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#eb0000", padding: "10px" }}
                          onClick={() => {
                            deleteStudents(student.roll);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "#f90b0b", padding: "10px" }}
                          onClick={() => {
                            navigate(`/faculty/students/edit/${student.roll}`, {
                              state: { classWithExams: student.class },
                            });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
          <div className="d-flex justify-content-between mt-3">
            <p>
              Showing {pagination.pageSize} students per page | Page{" "}
              {pagination.current} of{" "}
              {Math.ceil(totalStudents / pagination.pageSize)}
            </p>
            <p>Total Students: {totalStudents}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
