import Dates from "./Dates";
import Header from "./Header";
import { useState } from "react";
import moment from "moment";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const year = moment().format("YYYY");
const month = moment().format("MM");
const day = moment().format("DD");
function Calendar(props) {
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);

  const {
    customerChoose,
    setCustomerChoose,
    setShowCalendar,
    setShowCalendarFloat,
    showCourse,
    ifAddCart,
    setIfAddCart,
    userInfo,
  } = props;
  return (
    <>
      <div className="calendar-wrapper">
        <Header
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          year={year}
          months={months}
        />
        <Dates
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
      </div>
    </>
  );
}

export default Calendar;
