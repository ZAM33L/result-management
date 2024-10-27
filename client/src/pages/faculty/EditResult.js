import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoding, ShowLoading } from "../../redux/alerts";
import PageTitle from "../../components/PageTittle";
import Card from "react-bootstrap/Card";
import { Button, Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsDownToLine,
  faCircleCheck,
  faRectangleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function EditResult() {
  const [obtainedMarks, setObtainedMarks] = React.useState(null);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [students, setStudents] = React.useState([]);
  const [showStudentsModal, setShowStudentsModal] = React.useState(false);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();

  const getResult = async () => {
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
        const tempObtainedMarks = {};
        response.data.data.subjects.forEach((subject) => {
          tempObtainedMarks[subject.name] = 0;
        });
        setObtainedMarks(tempObtainedMarks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  const saveStudentResult = async () => {
    if (!result || !selectedStudent) {
      toast.error("Result or selected student is null.");
      return;
    }
    let verdict = "Pass";
    Object.keys(obtainedMarks).forEach((key) => {
      const subjectName = key;
      const marks = obtainedMarks[key];
      const subject = result?.subjects.find(
        (subject) => subject.name === subjectName
      );
      if (subject) {
        const passMarks = subject.passMarks;
        if (Number(marks) < Number(passMarks)) {
          verdict = "Fail";
        }
      } else {
        verdict = "Fail";
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/save-student-result",
        {
          resultId: params.resultId,
          exam: result?.exam,
          studentId: selectedStudent._id,
          obtainedMarks: obtainedMarks,
          verdict,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        toast.success(response.data.message);
        setObtainedMarks(null);
        setSelectedStudent(null);
        getStudents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      dispatch(HideLoding());
      toast.error("An error occurred while saving the result.");
    }
  };

  const getStudents = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students-by-filter",
        {
          sem: result?.sem, // Change this based on your result object
          year: result?.year, // Change this based on your result object
          branch: result?.branch, // Change this based on your result object
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
      toast.error("An error occurred while fetching students.");
    }
  };

  const columns = [
    {
      title: "ROLL",
      dataIndex: "roll",
      key: "roll",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        const resultExist = record.results.find(
          (result) => result.resultId === params.resultId
        );
        return resultExist ? (
          <FontAwesomeIcon icon={faCircleCheck} />
        ) : (
          <FontAwesomeIcon icon={faXmark} />
        );
      },
    },
  ];

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      getStudents(result.class);
    }
  }, [result]);
  const sortedStudents = [...students].sort((a, b) => {
    const statusA = a.results.some(
      (result) => result.resultId === params.resultId
    );
    const statusB = b.results.some(
      (result) => result.resultId === params.resultId
    );

    if (statusA && statusB) {
      return 0; // If both have status, maintain the current order
    } else if (statusB) {
      return -1; // Move students with faXmark to the beginning
    } else {
      return 1; // Move students with faCircleCheck to the end
    }
  });
  return (
    <>
      <PageTitle title="Result Info" />
      <br />
      <div className="px-5">
        {result && (
          <Card>
            <Card.Header as="h5">{result.exam}</Card.Header>
            <Card.Body>
              <Card.Text>Date : {result.date}</Card.Text>
              <Card.Text>Department : {result.branch}</Card.Text>
              <Card.Text>Year : {result.year}</Card.Text>
              <Card.Text>{result.sem}</Card.Text>
            </Card.Body>
          </Card>
        )}
        <hr />
        {!selectedStudent && obtainedMarks ? (
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => {
              setShowStudentsModal(true);
            }}
          >
            Add Student Marks
          </Button>
        ) : (
          <>
            {selectedStudent ? (
              <>
                <div className="d-flex justify-content-between p-2 align-items-center card flex-row">
                  <h5 className="text p-2">{selectedStudent?.name}</h5>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    icon={faRectangleXmark}
                    onClick={() => {
                      const tempObtainedMarks = {};
                      result.subjects.forEach((subject) => {
                        tempObtainedMarks[subject.name] = 0;
                      });
                      setObtainedMarks(tempObtainedMarks);
                      setSelectedStudent(null);
                    }}
                  />
                </div>
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Total Marks</th>
                      <th>Obtained Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result?.subjects?.map((subject, index) => (
                      <tr key={subject.name}>
                        <td>{subject?.name}</td>
                        <td>{subject?.totalMarks}</td>
                        <td>
                          <input
                            type="text"
                            placeholder="Obtained Marks"
                            value={
                              obtainedMarks && obtainedMarks[subject.name]
                                ? obtainedMarks[subject.name]
                                : ""
                            }
                            onChange={(e) => {
                              const tempObtainedMarks = { ...obtainedMarks };
                              tempObtainedMarks[subject.name] = e.target.value;
                              setObtainedMarks(tempObtainedMarks);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button className="mb-3" onClick={saveStudentResult}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => {
                  setShowStudentsModal(true);
                }}
              >
                Add Student Marks
              </Button>
            )}
          </>
        )}
      </div>
      <Modal
        visible={showStudentsModal}
        onCancel={() => {
          setShowStudentsModal(false);
        }}
      >
        <h3>
          Select Student <FontAwesomeIcon icon={faArrowsDownToLine} />
        </h3>
        <br />
        <Table
          columns={columns}
          dataSource={sortedStudents}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedStudent(record);
                const resultExist = record.results.find(
                  (result) => result.resultId === params.resultId
                );
                if (resultExist) {
                  setObtainedMarks(resultExist.obtainedMarks);
                }
                setShowStudentsModal(false);
              },
            };
          }}
        />
      </Modal>
    </>
  );
}

export default EditResult;
