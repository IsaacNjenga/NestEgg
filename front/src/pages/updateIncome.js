import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Typography, Select } from "antd";
import { incomeSources, frequency } from "../assets/data/data.js";
import Swal from "sweetalert2";

const initialValues = {
  amount: "",
  dateOfReceipt: "",
  frequency: "",
  incomeSource: "",
};

function UpdateIncome({ modalContent }) {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const userId = user;

  React.useEffect(() => {
    if (modalContent) {
      const newValues = {
        amount: modalContent.amount,
        dateOfReceipt: modalContent.dateOfReceipt,
        frequency: modalContent.frequency,
        incomeSource: modalContent.incomeSource,
      };
      setValues(newValues);
      form.setFieldsValue(newValues);
    }
  }, [modalContent, form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const valuesData = { ...values, userId: user };
      console.log(valuesData);
      //   const res = await axios.post("/income/update-income", valuesData);
      //   if (res.data.success) {
      //     Swal.fire({
      //       icon: "success",
      //       title: "Success",
      //       text: "Your information has been updated successfully",
      //     });
      //   }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again";

      Swal.fire({ icon: "error", title: "Error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "2rem 1rem",
          fontFamily: "Roboto",
        }}
      >
        <Typography.Title
          level={2}
          style={{
            fontFamily: "Raleway",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Update Income
        </Typography.Title>
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 900, margin: "2rem auto" }}
          onFinish={handleSubmit}
        >
          <Card>
            <Row gutter={16} align="middle">
              <Col span={10}>
                <Form.Item
                  label={`Income Source`}
                  name="incomeSource"
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
                  name="amount"
                  rules={[{ required: true, message: "Enter amount" }]}
                >
                  <Input placeholder="e.g. 1000" />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item
                  label="Frequency"
                  name="frequency"
                  rules={[{ required: true, message: "Select frequency" }]}
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
                <Form.Item label="Receipt Date" name="dateOfReceipt">
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

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
    </>
  );
}

export default UpdateIncome;
