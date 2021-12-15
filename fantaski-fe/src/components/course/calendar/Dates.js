import React from "react";
import DatesInMonth from "./DatesInMonth";

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

function Dates(props) {
  const {
    showCourse,
    selectedYear,
    selectedMonth,
    day,
    customerChoose,
    setCustomerChoose,
    setShowCalendar,
    setShowCalendarFloat,
    ifAddCart,
    userInfo,
    setIfAddCart,
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
            showCourse={showCourse}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            day={day}
            customerChoose={customerChoose}
            setCustomerChoose={setCustomerChoose}
            setShowCalendar={setShowCalendar}
            setShowCalendarFloat={setShowCalendarFloat}
            ifAddCart={ifAddCart}
            userInfo={userInfo}
            setIfAddCart={setIfAddCart}
          />
        </tbody>
      </table>
    </>
  );
}

export default Dates;
