import React from "react";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { format } from "date-fns";

function StartDate({ fieldName, startDate, setStartDate }) {
  const disabledDate = (current) => {
    const today = dayjs();
    return (
      current.isBefore(today.subtract(3, "years")) ||
      current.isAfter(today.add(3, "years"))
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <Form.Item name={[fieldName, "startDate"]} label="Start Date">
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          disabledDate={disabledDate}
          allowClear
        />
      </Form.Item>{" "}
    </div>
  );
}

export default StartDate;
