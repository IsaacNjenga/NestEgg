import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Typography, Select } from "antd";
import React from "react";
import {
  housingCategory,
  foodCategory,
  transportationCategory,
  personalCareCategory,
  healthMedicalCategory,
  insuranceCategory,
  savingsInvestmentsCategory,
  entertainmentCategory,
  debtpaymentsCategory,
  miscellaneousCategory,
  frequency,
} from "../assets/data/data";

const fieldss = [
  { key: 1, field: "Housing", value: "housing", category: housingCategory },
  { key: 2, field: "Food", value: "food", category: foodCategory },
  {
    key: 3,
    field: "Transportation",
    value: "transportation",
    category: transportationCategory,
  },
  {
    key: 4,
    field: "Personal Care",
    value: "personalCare",
    category: personalCareCategory,
  },
  {
    key: 5,
    field: "Health & Medical",
    value: "healthMedical",
    category: healthMedicalCategory,
  },
  {
    key: 6,
    field: "Insurance",
    value: "insurance",
    category: insuranceCategory,
  },
  {
    key: 7,
    field: "Savings & Investments",
    value: "savingsInvestments",
    category: savingsInvestmentsCategory,
  },
  {
    key: 8,
    field: "Entertainment",
    value: "entertainment",
    category: entertainmentCategory,
  },
  {
    key: 9,
    field: "Debt Payments",
    value: "debtPayments",
    category: debtpaymentsCategory,
  },
  {
    key: 10,
    field: "Misc. & Other",
    value: "miscellaneous",
    category: miscellaneousCategory,
  },
];

const AddExpenses = () => {
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
      <Typography.Title
        level={2}
        style={{ fontFamily: "Raleway", textAlign: "center", marginBottom: 40 }}
      >
        Expenses Breakdown
      </Typography.Title>

      <Form form={form} layout="vertical">
        <Form.List name="Expenses">
          {(fields, { add, remove }) => (
            <>
              {fieldss.map((field) => (
                <Card
                  key={field.key}
                  title={
                    <Typography.Title
                      level={5}
                      style={{ fontFamily: "Raleway", marginBottom: 0 }}
                    >
                      {field.field}
                    </Typography.Title>
                  }
                  style={{
                    marginBottom: 24,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  bodyStyle={{ padding: "1.5rem" }}
                >
                  <Form.List name={[field.value, `${field.value}Details`]}>
                    {(subFields, subOpt) => (
                      <>
                        {subFields.map((subField) => (
                          <Row gutter={16} key={subField.key} align="middle">
                            <Col xs={24} md={7}>
                              <Form.Item
                                label="Expense"
                                name={[subField.name, "expenseName"]}
                                rules={[
                                  { required: true, message: "Required" },
                                ]}
                              >
                                <Select placeholder="Select category">
                                  {field.category.map((i) => (
                                    <Select.Option
                                      key={i.value}
                                      value={i.value}
                                    >
                                      {i.label}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={7}>
                              <Form.Item
                                label="Amount"
                                name={[subField.name, "amount"]}
                                rules={[
                                  { required: true, message: "Required" },
                                ]}
                              >
                                <Input placeholder="1000" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={7}>
                              <Form.Item
                                label="Frequency"
                                name={[subField.name, "frequency"]}
                                rules={[
                                  { required: true, message: "Required" },
                                ]}
                              >
                                <Select placeholder="Select...">
                                  {frequency.map((f) => (
                                    <Select.Option
                                      key={f.value}
                                      value={f.value}
                                    >
                                      {f.label}
                                    </Select.Option>
                                  ))}
                                </Select>
                                <Form.Item></Form.Item>
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={7}>
                              <Form.Item shouldUpdate>
                                {({ getFieldValue }) => {
                                  const freq = getFieldValue([
                                    "Expenses",
                                    field.name,
                                    `${field.field}Details`,
                                    subField.name,
                                    "frequency",
                                  ]);
                                  return freq ? (
                                    <Typography.Text type="secondary">
                                      Selected Frequency:{" "}
                                      <strong>{freq}</strong>
                                    </Typography.Text>
                                  ) : null;
                                }}
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={3} style={{ textAlign: "center" }}>
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
                            style={{
                              width: "100%",
                              fontFamily: "Roboto",
                              borderStyle: "dashed",
                            }}
                          >
                            Add Expense Detail
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Card>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography.Paragraph
              style={{
                background: "#f9f9f9",
                padding: "1rem",
                borderRadius: 8,
                fontSize: "0.85rem",
                fontFamily: "Roboto",
              }}
            >
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography.Paragraph>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExpenses;
