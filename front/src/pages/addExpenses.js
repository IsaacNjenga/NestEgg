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

function AddExpenses() {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Form.List name="Expenses">
          {(fields, { add, remove }) => (
            <>
              {fieldss.map((field, index) => (
                <Card
                  key={field.key}
                  size="medium"
                  title={`${field.field}`}
                  style={{ marginBottom: 10 }}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label={`${field.field}`}
                        name={[field.value, `${field.value}Category`]}
                        rules={[
                          {
                            required: true,
                            message: "Please select a category",
                          },
                        ]}
                      >
                        <Select placeholder="Select...">
                          {field.category.map((i) => (
                            <Select.Option key={i.value} value={i.value}>
                              {i.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.List name={[field.value, `${field.value}Details;`]}>
                    {(subFields, subOpt) => (
                      <>
                        {subFields.map((subField) => (
                          <Row gutter={16} key={subField.key} align="left">
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
                                <Input />
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
                        <Form.Item wrapperCol={{ offset: 6 }}>
                          <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            onClick={() => subOpt.add()}
                          >
                            Add expense Detail
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
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add expense
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* Debug Preview */}
        <Form.Item shouldUpdate noStyle>
          {() => (
            <Typography.Paragraph>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography.Paragraph>
          )}
        </Form.Item>
      </Form>
    </>
  );
}

export default AddExpenses;
