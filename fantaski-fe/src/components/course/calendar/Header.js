import React from "react";
import "./index.css";
//只開放3年內的預約
const yearsCanSelect = (year) => {
  let yearsOptions = [];
  for (let i = 0; i < 3; i++) {
    yearsOptions.push(Number(year) + i);
  }
  return yearsOptions;
};

function Header(props) {
  const {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    year,
    months,
  } = props;
  return (
    <div className="text-center calendar-header py-1">
      {/* 「年」的選單 */}
      <select
        className="date-select-box"
        name=""
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
        }}
      >
        {yearsCanSelect(year).map((v) => {
          return (
            <option value={v} key={v}>
              {v}
            </option>
          );
        })}
      </select>
      {/* 「月」的選單 */}
      <select
        name=""
        value={selectedMonth}
        onChange={(e) => {
          setSelectedMonth(e.target.value);
        }}
      >
        {months.map((v) => {
          return (
            <option value={v} key={v}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Header;
