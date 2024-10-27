import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Form, Input, Select } from "antd";
import { Row, Col } from "antd";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { HideLoding, ShowLoading } from "../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentForm({ student, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "edit") {
        response = await axios.post(
          `/api/student/update-student/${student.roll}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post("/api/student/add-student", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      dispatch(HideLoding());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/faculty/students");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Container>
        <i>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              marginTop: "10px",
            }}
            onFinish={onFinish}
            initialValues={student}
          >
            <br />
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Name" name="name">
                  <Input required placeholder="Student Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Roll NO" name="roll">
                  <Input
                    disabled={type === "edit" ? true : false}
                    placeholder="AU Reg No"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Email ID" name="email">
                  <Input required placeholder="Student EmailID" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Phone Number" name="phone">
                  <Input required placeholder="Student Phone Number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Year"
                  name="year"
                  rules={[
                    {
                      required: true,
                      message: "Please select a year",
                    },
                  ]}
                >
                  <Select placeholder="Select Student Year">
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                    <Select.Option value="4">4</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Semester"
                  name="sem"
                  rules={[
                    {
                      required: true,
                      message: "Please select a semester",
                    },
                  ]}
                >
                  <Select placeholder="Select Student Semester" required>
                    <Select.Option value="Semester-1">1</Select.Option>
                    <Select.Option value="Semester-2">2</Select.Option>
                    <Select.Option value="Semester-3">3</Select.Option>
                    <Select.Option value="Semester-4">4</Select.Option>
                    <Select.Option value="Semester-5">5</Select.Option>
                    <Select.Option value="Semester-6">6</Select.Option>
                    <Select.Option value="Semester-7">7</Select.Option>
                    <Select.Option value="Semester-8">8</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Department"
                  name="branch"
                  rules={[
                    {
                      required: true,
                      message: "Please select a department!",
                    },
                  ]}
                >
                  <Select placeholder="Select Student Department">
                    <Select.Option value="Electrical and Electronics Engineering">
                      Electrical and Electronics
                    </Select.Option>
                    <Select.Option value="Electrical and Communication Engineering">
                      Electrical and Communication
                    </Select.Option>
                    <Select.Option value="Computer Science Engineering">
                      Computer Science
                    </Select.Option>
                    <Select.Option value="Information Technology">
                      Information Technology
                    </Select.Option>
                    <Select.Option value="Cyber Security">
                      Cyber Security
                    </Select.Option>
                    <Select.Option value="Computer Science and Busssiness System">
                      CSBS
                    </Select.Option>
                    <Select.Option value="Civil Engineering">
                      Civil
                    </Select.Option>
                    <Select.Option value="Mechanical Engineering">
                      Mechanical
                    </Select.Option>
                    <Select.Option value="AIDS ">AIDS</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Expected Passing Year" name="passing">
                  <Input placeholder="Expected Passing (eg : 2025)" required />
                </Form.Item>
              </Col>
            </Row>
            <MDBBtn type="submit" className="mb-4" block>
              Save
            </MDBBtn>
          </Form>
        </i>
      </Container>
    </div>
  );
}
