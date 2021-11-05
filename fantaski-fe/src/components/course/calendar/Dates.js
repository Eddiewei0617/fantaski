import React from "react";
import DatesInMonth from "./DatesInMonth";

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

function Dates(props) {
  const {
    selectedYear,
    selectedMonth,
    day,
    setCustomerChoose,
    setShowCalendar,
    setShowCalendarFloat,
  } = props;

  return (
    <>
      <table className="table table-bordered text-center">
        <thead>
          <tr className="calendar-dates-week">
            {weekdays.map((v, i) => {
              return (
                <>
                  <th key={i}>{v}</th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <DatesInMonth
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            day={day}
            setCustomerChoose={setCustomerChoose}
            setShowCalendar={setShowCalendar}
            setShowCalendarFloat={setShowCalendarFloat}
          />
        </tbody>
      </table>
    </>
  );
}

export default Dates;
