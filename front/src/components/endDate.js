import React from "react";
import { DatePicker, Form } from "antd";

const rangeToDays = {
  daily: 1,
  weekly: 6,
  biWeekly: 13,
  semiMonthly: 15,
  monthly: 30,
  semiAnnually: 180,
  annually: 365,
};

function EndDate({ range, startDate, fieldName }) {
  const endDate =
    startDate && rangeToDays[range]
      ? startDate.clone().add(rangeToDays[range], "days")
      : null;

  return (
    <>
      {endDate ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>End date will be: {endDate.format("YYYY-MM-DD")}</span>
          <Form.Item label="End Date" name={[fieldName, "endDate"]}>
            <DatePicker value={endDate} />
          </Form.Item>
        </div>
      ) : null}
    </>
  );
}

export default EndDate;
