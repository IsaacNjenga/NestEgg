// AddIncome.jsx
import React from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Typography, Select } from "antd";
import { incomeSources, frequency } from "../assets/data/data.js";

function AddIncome() {
  const [form] = Form.useForm();

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
      >
        <Form.List name="Source Of Income">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  title={`Source ${index + 1}`}
                  style={{ marginBottom: 24, borderRadius: 12 }}
                  bordered
                  extra={
                    fields.length > 1 && (
                      <Button
                        danger
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    )
                  }
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Income Source"
                        name={[field.name, "incomeSource"]}
                        rules={[
                          { required: true, message: "Please select a source" },
                        ]}
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
                  </Row>

                  <Form.List name={[field.name, "incomeDetails"]}>
                    {(subFields, subOpt) => (
                      <>
                        {subFields.map((subField) => (
                          <Row gutter={16} key={subField.key} align="middle">
                            <Col span={10}>
                              <Form.Item
                                label="Amount"
                                name={[subField.name, "amount"]}
                                rules={[
                                  { required: true, message: "Enter amount" },
                                ]}
                              >
                                <Input placeholder="e.g. 1000" />
                              </Form.Item>
                            </Col>
                            <Col span={10}>
                              <Form.Item
                                label="Frequency"
                                name={[subField.name, "frequency"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Select frequency",
                                  },
                                ]}
                              >
                                <Select placeholder="Select frequency">
                                  {frequency.map((f) => (
                                    <Select.Option
                                      key={f.value}
                                      value={f.value}
                                    >
                                      {f.label}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Button
                                danger
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => subOpt.remove(subField.name)}
                              />
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            onClick={() => subOpt.add()}
                          >
                            Add Income Detail
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Card>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >
                  Add Income Source
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
