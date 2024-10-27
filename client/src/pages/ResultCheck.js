import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoding, ShowLoading } from "../redux/alerts";
import { Button, InputGroup } from "react-bootstrap";
import html2canvas from "html2canvas";
import Navigation from "../components/Navigation";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

function ResultCheck() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const [roll, setRoll] = React.useState("");
  const [studentResult, setStudentResult] = React.useState(null);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();

  const handlePrint = () => {
    const card = document.getElementById("print-card");
    html2canvas(card).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${studentResult.name}.png`;
      a.click();
    });
  };
  const getResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-result/${params.resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  const getStudentResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-student-result`,
        {
          roll: roll,
          resultId: params.resultId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        setStudentResult(response.data.data);
      } else {
        toast.error(
          response.data.message ||
            "Student Not found or Check the Examination Name"
        );
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error("Student Not found or Check the Examination Name");
    }
  };

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);

  const getPercentage = () => {
    let totalMarks = 0;
    let obtainedMarks = 0;
    result.subjects.forEach((subject) => {
      totalMarks += Number(subject.totalMarks);
    });
    Object.keys(studentResult.obtainedMarks).forEach((key) => {
      obtainedMarks += Number(studentResult.obtainedMarks[key]);
    });
    return (obtainedMarks / totalMarks) * 100;
  };

  return (
    <>
      <Navigation />
      {result && (
        <div className="container p-2">
          <div as="h5">
            Examination : <i style={{ color: "red" }}>{result.exam}</i>
            <br />
            Department : <i style={{ color: "red" }}>{result.branch}</i>
            <br />
            Year : <i style={{ color: "red" }}>{result.year}</i>
            <br />
            <i i style={{ color: "red" }}>
              {result.sem}
            </i>
            <InputGroup className="mt-2">
              <Input
                type="text"
                placeholder="Enter Register Number"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <Button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  getStudentResult();
                  openModal();
                }}
                id="search-addon"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup>
          </div>
          <div>
            {studentResult && (
              <>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Student Result</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="container">
                    <div id="print-card">
                      <div className="row text-center">
                        <div className="col">
                          <p>
                            <i>{studentResult.name}</i>
                            <br />
                            <i>{studentResult.roll}</i>
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            <i> Percentage : {getPercentage().toFixed(2)}%</i>
                            <br />
                            <i>
                              Student Status :{" "}
                              {studentResult?.verdict?.toUpperCase()}
                            </i>
                          </p>
                        </div>
                      </div>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr style={{ fontStyle: "italic" }}>
                            <th>
                              <i>Subject</i>
                            </th>
                            <th>
                              <i>Total Marks</i>
                            </th>
                            <th>
                              <i>Obtained Marks</i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.subjects.map((subject, index) => (
                            <tr key={index}>
                              <td>{subject.name}</td>
                              <td>{subject.totalMarks}</td>
                              <td>
                                {studentResult.obtainedMarks[subject?.name] ||
                                  0}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary" onClick={handlePrint}>
                      Print My Result
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ResultCheck;
