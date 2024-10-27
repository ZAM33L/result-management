import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Button, Form, Input, Select, Space } from "antd";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HideLoding, ShowLoading } from "../redux/alerts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

function ResultForm() {
  const navigate = useNavigate();
  const { faculty } = useSelector((state) => state.faculty);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.createdBy = String(faculty._id);
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/results/add-result", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoding());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error("Result Already Exist");
    }
  };
  return (
    <div>
      <Container>
        <strong>
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
            colon={false}
            onFinish={onFinish}
            initialValues={null}
          >
            <Row>
              <Col>
                <Form.Item
                  name="exam"
                  rules={[
                    {
                      required: true,
                      message: "Please select an exam!",
                    },
                  ]}
                >
                  <Select placeholder="Select Examination">
                    <Select.Option value="Internel Assessment Test 1">
                      Internel Assessment Test 1
                    </Select.Option>
                    <Select.Option value="Internel Assessment Test 2">
                      Internel Assessment Test 2
                    </Select.Option>
                    <Select.Option value="Internel Assessment Test 3">
                      Internel Assessment Test 3
                    </Select.Option>
                    <Select.Option value="Internel Assessment Test 4">
                      Internel Assessment Test 4
                    </Select.Option>
                    <Select.Option value="Internel Assessment Test 5">
                      Internel Assessment Test 5
                    </Select.Option>
                    <Select.Option value="Other Exams">
                      Other Exams
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="date">
                  <Input type="date" required />
                </Form.Item>
                <Form.Item
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
                <Form.Item
                  name="sem"
                  rules={[
                    {
                      required: true,
                      message: "Please select a semester",
                    },
                  ]}
                >
                  <Select placeholder="Select Student Semester">
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

                <Form.Item
                  name="branch"
                  rules={[
                    {
                      required: true,
                      message: "Please select a department!",
                    },
                  ]}
                >
                  <Select placeholder="Select Student Department">
                    <Select.Option value="">Department</Select.Option>
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
              <Col>
                <Form.List name="subjects">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input placeholder="Subject Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "totalMarks"]}
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input placeholder="Total Marks" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "passMarks"]}
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input placeholder="Passing Marks" />
                          </Form.Item>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                              color: "#eb0000",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}

                      <Button
                        style={{ marginBottom: "10px" }}
                        onClick={() => add()}
                      >
                        Add Subject
                      </Button>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <br />
            <MDBBtn type="submit" className="mb-4" block>
              Save
            </MDBBtn>
          </Form>
        </strong>
      </Container>
    </div>
  );
}

export default ResultForm;
