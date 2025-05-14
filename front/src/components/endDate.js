import React from "react";
import { DatePicker, Form } from "antd";
import { format } from "date-fns";

const rangeToDays = {
  Rare: 0,
  Occasional: 0,
  Daily: 1,
  Weekly: 6,
  "Bi-Weekly": 13,
  "Semi-Monthly": 15,
  Monthly: 30,
  "Semi-Annually": 180,
  Annually: 365,
};

function EndDate({ range, startDate, fieldName }) {
  // console.log(startDate);
  const endDate =
    startDate && rangeToDays[range]
      ? startDate.clone().add(rangeToDays[range], "days")
      : null;

  const handleChange = (name, value) => {
    const selectedDate = value.$d;
    const formattedSelectedDate = format(new Date(selectedDate), "yyyy-MM-dd");
    const setEndDate = endDate.$d;
    const formattedEndDate = format(new Date(setEndDate), "yyyy-MM-dd");
    console.log(formattedEndDate);
    if (formattedSelectedDate !== formattedEndDate) {
      console.warn("Dates are not matching");
      return;
    } else {
      console.log("Good match");
    }
  };

  return (
    <>
      {endDate ? (
        <div>
          <Form.Item
            label="End Date"
            name={[fieldName, "endDate"]}
            rules={[
              {
                required: false,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !startDate || !rangeToDays[range]) {
                    return Promise.resolve(); // Skip validation if missing inputs
                  }

                  const expected = startDate
                    .clone()
                    .add(rangeToDays[range], "days")
                    .startOf("day");
                  const selected = value.clone().startOf("day");

                  if (selected.isSame(expected)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      `End date must be ${expected.format("YYYY-MM-DD")}`
                    )
                  );
                },
              }),
            ]}
          >
            <DatePicker
              value={endDate}
              onChange={(value) => handleChange(fieldName, value)}
            />
            <p>({endDate.format("YYYY-MM-DD")})</p>
          </Form.Item>
        </div>
      ) : null}
    </>
  );
}

export default EndDate;
