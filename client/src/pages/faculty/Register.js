import React from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoding, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../components/Navigation";
import { UserOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/faculty/register", values);
      dispatch(HideLoding());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };
  return (
    <>
      <Navigation />
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol md="8">
            <div className="text-start">
              <h1 style={{ color: "black" }}>
                Welcome Our
                <span style={{ color: "#2B3499" }}> Faculties!</span>
              </h1>
            </div>
            <p style={{ color: "black" }}>
              The The college campus, sprawling over 70 acres of greenery
              located inside the SIPCOT IT Park, Siruseri is surrounded by
              multinational IT companies such as TCS, CTS, Intellect, Aspire,
              Steria, Polaris, FSS, etc. MSAJCE has good infrastructure
              facilities such as spacious classrooms, drawing halls,
              laboratories, seminar halls, computer facilities with internet and
              wifi connectivity, library, workshops, auditorium and playground.
              The college is well connected by Road, Rail and Air from various
              parts of the country. A team of well qualified and experienced
              faculty supports the teaching and learning process. The college
              provides equal importance for academic, co curricular and
              extracurricular activities. MSAJCE provides all kinds of training
              for the professional and overall transformation of the students.
            </p>
          </MDBCol>
          <MDBCol md="3" style={{ border: "1px solid black" ,backgroundColor:'#F2F1EB',borderRadius:"10px"}}>
            <div>
              <div className="text-center mt-2">
                <h3 style={{ color: "#C23373" }}>
                  REGISTER <FontAwesomeIcon icon={faRightToBracket} />
                </h3>
              </div>
              <Form
                onFinish={onFinish}
                labelCol={{
                  span: 10,
                }}
                wrapperCol={{
                  span: 25,
                }}
              >
                <Form.Item name="faculty">
                  <Input
                    prefix={<UserOutlined />}
                    style={{ border: "1px solid black" }}
                    placeholder="Faculty Name"
                    required
                  />
                </Form.Item>
                <Form.Item name="facultyID">
                  <Input
                    style={{ border: "1px solid black" }}
                    prefix={<EditOutlined />}
                    placeholder="Faculty ID"
                    required
                  />
                </Form.Item>
                <Form.Item name="password">
                  <Input.Password
                    prefix={<LockOutlined />}
                    style={{ border: "1px solid black" }}
                    placeholder="Enter Your Password"
                    required
                  />
                </Form.Item>
                <MDBBtn className="w-100" size="md">
                  Sign up
                </MDBBtn>
              </Form>
              <hr />
              <div className="text-center">
                <p>Already Have an Account ?</p>
                <Link to="/login">
                  <MDBBtn
                    className="mb-2"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    size="md"
                  >
                    Sign in
                  </MDBBtn>
                </Link>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Register;
