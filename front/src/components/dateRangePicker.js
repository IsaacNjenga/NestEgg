import React, { useState } from "react";
import { DatePicker, Typography } from "antd";
import dayjs from "dayjs";

const rangeToDays = {
  daily: 1,
  weekly: 6,
  biWeekly: 13,
  semiMonthly: 15,
  monthly: 30,
  semiAnnually: 180,
  annually: 365,
};

function DateRangePicker() {
  const [range, setRange] = useState("monthly");
  const [startDate, setStartDate] = useState(null);

  const endDate =
    startDate && rangeToDays[range]
      ? startDate.clone().add(rangeToDays[range], "days")
      : null;

  const disabledDate = (current) => {
    const today = dayjs();
    return (
      current.isBefore(today.subtract(3, "years")) ||
      current.isAfter(today.add(3, "years"))
    );
  };

  return (
    <div>
      {/* <Typography.Title level={5}>Select Range Type</Typography.Title>
      <Select value={range} onChange={setRange} style={{ width: 200 }}>
        <Option value="daily">Daily (1 day)</Option>
        <Option value="weekly">Weekly (7 days)</Option>
        <Option value="biWeekly">Bi-Weekly (14 days)</Option>
        <Option value="semiMonthly">Semi-Monthly (15 days)</Option>
        <Option value="monthly">Monthly (30 days)</Option>
        <Option value="semiAnnually">Semi-Annually (6 months)</Option>
        <Option value="annually">Annually (12 months)</Option>
      </Select> */}
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Typography.Title level={5}>Start Date</Typography.Title>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          disabledDate={disabledDate}
          allowClear
        />

        <Typography.Title level={5}>End Date (auto)</Typography.Title>
        <DatePicker value={endDate} disabled readOnly />
      </div>

      {/* {startDate && endDate && (
        <Typography.Text>
          Range: {startDate.format("YYYY-MM-DD")} →{" "}
          {endDate.format("YYYY-MM-DD")}
        </Typography.Text>
      )} */}
    </div>
  );
}

export default DateRangePicker;
