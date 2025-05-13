// AddIncome.jsx
import React, { useContext, useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Typography, Select } from "antd";
import { incomeSources, frequency } from "../assets/data/data.js";
import Swal from "sweetalert2";
import { UserContext } from "../App.js";
import axios from "axios";
import UseGetAllIncome from "../assets/hooks/useGetAllIncome.js";

function AddIncome() {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { refresh } = UseGetAllIncome();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const valuesData = { ...values, userId: user };
      // console.log(valuesData);
      const res = await axios.post("/income/create-income", valuesData);
      refresh();
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your information has been saved successfully",
        });
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again";

      Swal.fire({ icon: "error", title: "Error", text: errorMessage });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "Roboto",
      }}
    >
      {" "}
      <Typography.Title
        level={2}
        style={{ fontFamily: "Raleway", textAlign: "center", marginBottom: 40 }}
      >
        Income
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 900, margin: "2rem auto" }}
        onFinish={handleSubmit}
      >
        <Form.List name="incomeSourceDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Card key={field.key}>
                  <Row gutter={16} key={field.key} align="middle">
                    <Col span={10}>
                      <Form.Item
                        label={`Income Source ${index + 1}`}
                        name={[field.name, "incomeSource"]}
                        rules={[{ required: true, message: "Select source" }]}
                      >
                        <Select placeholder="Select source">
                          {incomeSources.map((i) => (
                            <Select.Option key={i.value} value={i.value}>
                              {i.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={10}>
                      <Form.Item
                        label="Amount"
                        name={[field.name, "amount"]}
                        rules={[{ required: true, message: "Enter amount" }]}
                      >
                        <Input placeholder="e.g. 1000" />
                      </Form.Item>
                    </Col>

                    <Col span={10}>
                      <Form.Item
                        label="Frequency"
                        name={[field.name, "frequency"]}
                        rules={[
                          { required: true, message: "Select frequency" },
                        ]}
                      >
                        <Select placeholder="Select frequency">
                          {frequency.map((f) => (
                            <Select.Option key={f.value} value={f.value}>
                              {f.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={10}>
                      <Form.Item
                        label="Receipt Date"
                        name={[field.name, "dateOfReceipt"]}
                      >
                        <Input type="date" />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Button
                        danger
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >
                  Add Income Source
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" loading={loading} htmlType="submit">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => (
            <Typography.Paragraph>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography.Paragraph>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddIncome;
