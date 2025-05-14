import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Typography, Select } from "antd";
import React, { useContext, useState } from "react";
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
import StartDate from "../components/startDate";
import EndDate from "../components/endDate";
import Swal from "sweetalert2";
//import { format } from "date-fns";
import { useWatch } from "antd/es/form/Form";
import { UserContext } from "../App";

const categoryMap = {
  Housing: housingCategory,
  Food: foodCategory,
  Transportation: transportationCategory,
  "Personal Care": personalCareCategory,
  "Health & Medical": healthMedicalCategory,
  Insurance: insuranceCategory,
  "Savings & Investments": savingsInvestmentsCategory,
  Entertainment: entertainmentCategory,
  "Debt Payments": debtpaymentsCategory,
  "Misc. & Other": miscellaneousCategory,
};

const expenseFields = [
  { key: 1, field: "Housing", value: "Housing", category: housingCategory },
  { key: 2, field: "Food", value: "Food", category: foodCategory },
  {
    key: 3,
    field: "Transportation",
    value: "Transportation",
    category: transportationCategory,
  },
  {
    key: 4,
    field: "Personal Care",
    value: "Personal Care",
    category: personalCareCategory,
  },
  {
    key: 5,
    field: "Health & Medical",
    value: "Health & Medical",
    category: healthMedicalCategory,
  },
  {
    key: 6,
    field: "Insurance",
    value: "Insurance",
    category: insuranceCategory,
  },
  {
    key: 7,
    field: "Savings & Investments",
    value: "Savings & Investments",
    category: savingsInvestmentsCategory,
  },
  {
    key: 8,
    field: "Entertainment",
    value: "Entertainment",
    category: entertainmentCategory,
  },
  {
    key: 9,
    field: "Debt Payments",
    value: "Debt Payments",
    category: debtpaymentsCategory,
  },
  {
    key: 10,
    field: "Misc. & Other",
    value: "Misc. & Other",
    category: miscellaneousCategory,
  },
];

const ExpenseItem = ({
  field,
  remove,
  form,
  expenseFields,
  categoryMap,
  frequency,
  key,
}) => {
  const [range, setRange] = useState("monthly");
  const [startDate, setStartDate] = useState(null);
  const { isMobile } = useContext(UserContext);

  const selectedCategory = useWatch(
    ["expensesDetails", field.name, "category"],
    form
  );

  const expenseOptions = categoryMap[selectedCategory] || [];

  return (
    <Card
      key={field.key}
      style={{
        marginBottom: 18,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      title={`Expense Entry ${field.name + 1}`}
      extra={
        <Button
          type="text"
          danger
          icon={<CloseOutlined />}
          onClick={() => remove(field.name)}
        />
      }
    >
      <Row gutter={16} align="middle">
        <Col xs={24} md={6}>
          <Form.Item
            label="Category"
            name={[field.name, "category"]}
            rules={[{ required: true, message: "Required" }]}
          >
            <Select placeholder="Select category">
              {expenseFields.map((cat) => (
                <Select.Option key={cat.value} value={cat.value}>
                  {cat.field}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label="Expense"
            name={[field.name, "expenseName"]}
            rules={[{ required: true, message: "Required" }]}
          >
            <Select placeholder="Select..." disabled={!selectedCategory}>
              {expenseOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label="Amount"
            name={[field.name, "amount"]}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="1000" />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label="Frequency"
            name={[field.name, "frequency"]}
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              placeholder="Select..."
              onChange={(value) => setRange(value)}
              value={range}
            >
              {frequency.map((f) => (
                <Select.Option key={f.value} value={f.value}>
                  {f.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          gap: "2px",
          justifyContent: "left",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Col xs={24} md={6}>
          <StartDate
            startDate={startDate}
            setStartDate={setStartDate}
            fieldName={[field.name]}
          />
        </Col>
        <Col xs={24} md={6}>
          <EndDate
            range={range}
            startDate={startDate}
            fieldName={[field.name]}
          />
        </Col>
      </div>
    </Card>
  );
};

const AddExpenses = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allValues = await form.validateFields();
      const expenses = allValues.expensesDetails || [];
      const formattedExpenses = expenses.map((entry) => ({
        ...entry,
        startDate: entry.startDate?.format("YYYY-MM-DD"),
        endDate: entry.endDate?.format("YYYY-MM-DD"),
      }));
      const finalValues = { Expenses: formattedExpenses };
      console.log(finalValues);
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
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "Roboto",
      }}
    >
      <Typography.Title
        level={2}
        style={{ fontFamily: "Raleway", textAlign: "center", marginBottom: 40 }}
      >
        Expenses
      </Typography.Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.List name="expensesDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <ExpenseItem
                  key={field.key}
                  field={field}
                  remove={remove}
                  form={form}
                  expenseFields={expenseFields}
                  categoryMap={categoryMap}
                  frequency={frequency}
                />
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                  style={{ width: "100%", fontFamily: "Roboto" }}
                >
                  Add An Expense
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
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
