import Dates from "./Dates";
import Header from "./Header";
import { useState } from "react";
import * as moment from "../../../node_modules/moment";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const year = moment().format("YYYY");
const month = moment().format("MM");
const day = moment().format("DD");

function Calendar() {
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);

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
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          day={day}
        />
      </div>
    </>
  );
}

export default Calendar;
