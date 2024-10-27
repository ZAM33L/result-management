import React, { useEffect } from "react";
import PageTitle from "../../components/PageTittle";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit"; // Import MDBReact components
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoding, ShowLoading } from "../../redux/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Results() {
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/get-all-results",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  const deleteResult = async (_id) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/delete-result/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        getResults();
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
    getResults();
  }, []);

  return (
    <>
      <div className="container">
        <PageTitle title="Results" />
        <br />
        <div className="p-2 container">
          <Button
            className="mb-2"
            variant="light"
            onClick={() => {
              navigate("/faculty/results/add");
            }}
          >
            New Result <FontAwesomeIcon icon={faFileCirclePlus} />
          </Button>
        </div>
        <MDBTable responsive>
          <MDBTableHead>
            <tr>
              <th
                style={{ border: "1px solid black", color: "#C23373" }}
                scope="col"
              >
                <i>Examination</i>
              </th>
              <th
                style={{ border: "1px solid black", color: "#C23373" }}
                scope="col"
              >
                <i>Date</i>
              </th>
              <th
                style={{ border: "1px solid black", color: "#C23373" }}
                scope="col"
              >
                <i>Year</i>
              </th>
              <th
                style={{ border: "1px solid black", color: "#C23373" }}
                scope="col"
              >
                <i>Semester</i>
              </th>
              <th
                style={{ border: "1px solid black", color: "#C23373" }}
                scope="col"
              >
                <i>Department</i>
              </th>
              <th
                style={{ border: "1px solid black", color: "#C23373" }}
                scope="col"
              >
                <i>Action</i>
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {results.reverse().map((result, index) => (
              <tr style={{ border: "1px solid black" }} key={index}>
                <td style={{ border: "1px solid black" }}>{result.exam}</td>
                <td style={{ border: "1px solid black" }}>{result.date}</td>
                <td style={{ border: "1px solid black" }}>{result.year}</td>
                <td style={{ border: "1px solid black" }}>{result.sem}</td>
                <td style={{ border: "1px solid black" }}>{result.branch}</td>
                <td>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#eb0000", padding: "10px" , cursor:"pointer"}}
                      onClick={() => {
                        deleteResult(result._id);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#f90b0b", padding: "10px", cursor:"pointer" }}
                      onClick={() => {
                        navigate(`/faculty/results/edit/${result._id}`);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </>
  );
}

export default Results;
