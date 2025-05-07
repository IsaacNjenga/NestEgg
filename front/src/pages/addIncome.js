import React from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Typography, Select } from "antd";
import { incomeSources, frequency } from "../assets/data/data.js";

function AddIncome() {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        //name="dynamic_form_complex"
        initialValues={{ items: [{}] }}
        autoComplete="off"
        layout="horizontal"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Form.List name="Source Of Income">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  size="small"
                  title={`Source ${index + 1}`}
                  style={{ marginBottom: 10 }}
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
                        <Form.Item wrapperCol={{ offset: 6 }}>
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
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Income Source
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

export default AddIncome;
