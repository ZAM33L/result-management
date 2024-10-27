import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoding, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  faPersonCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigation from "../../components/Navigation";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish1 = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/faculty/request-approval", {
        fID: values.fID,
        message: values.message || "Registered, seeking account approval.",
      });
      dispatch(HideLoding());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/faculty/login", values);
      dispatch(HideLoding());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/faculty");
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
          <div>
            <div className="text-center">
              <h1 style={{ color: "black" }}>
                Welcome Our
                <span style={{ color: "#2B3499" }}> Faculties !</span>
              </h1>
            </div>
            <p style={{ color: "black" }}>
              The Mohamed Sathak A.J. College of Engineering (MSAJCE),
              established on 5th July 2001 under the aegis of Mohamed Sathak
              Trust, is approved by AICTE New Delhi, affiliated to Anna
              University Chennai and Government of Tamil Nadu. MSAJCE Strives to
              continuously upgrade its facilities to provide quality technical
              education to meet the industrial and societal needs, by providing
              skill based training with the state of art facilities.
            </p>
          </div>
          <MDBRow className="justify-content-around">
            <MDBCol md="4">
              <div className="mt-2">
                <div className="text-center">
                  <h3 style={{ color: "#C23373" }}>
                    LOGIN {<LoginOutlined />}
                  </h3>
                </div>
                <Form
                  onFinish={onFinish}
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 25,
                  }}
                >
                  <Form.Item name="facultyID">
                    <Input
                      prefix={<UserOutlined />}
                      style={{ border: "1px solid black" }}
                      placeholder="Enter Your Faculty ID"
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
                  <MDBBtn className="w-100 mb-2" size="md">
                    Sign In
                  </MDBBtn>
                </Form>
                <hr />
                <div className="text-center">
                  <p>New Faculty ?</p>
                  <Link to="/register">
                    <MDBBtn
                      className="mb-2"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                      size="md"
                    >
                      Sign Up
                    </MDBBtn>
                  </Link>
                </div>
              </div>
              <br />
            </MDBCol>
            <MDBCol md="4">
              <div className="text-center mt-2">
                <h5 style={{ color: "red" }}>
                  Get Approval{" "}
                  <FontAwesomeIcon color="black" icon={faPersonCircleCheck} />
                </h5>
              </div>
              <Form
                onFinish={onFinish1}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 25,
                }}
              >
                <Form.Item name="fID">
                  <Input
                    prefix={<UserOutlined />}
                    style={{ border: "1px solid black" }}
                    placeholder="Enter Your Faculty ID"
                    required
                  />
                </Form.Item>
                <Form.Item name="message">
                  <Input
                    style={{ border: "1px solid black" }}
                    required
                    placeholder="Registered, seeking account approval."
                    disabled
                  />
                </Form.Item>
                <div className="text-center">
                  <MDBBtn className="mb-2" size="md">
                    Get
                  </MDBBtn>
                </div>
              </Form>
            </MDBCol>
          </MDBRow>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Login;
