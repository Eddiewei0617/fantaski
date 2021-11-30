import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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

  //左右箭頭點選後函式
  const selectOnLeftChange = () => {
    if (selectedMonth == 1) {
      setSelectedYear(Number(selectedYear) - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(Number(selectedMonth) - 1);
    }
  };
  const selectOnRightChange = () => {
    if (selectedMonth == 12) {
      setSelectedYear(Number(selectedYear) + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(Number(selectedMonth) + 1);
    }
  };

  return (
    <div className="text-center calendar-header py-1">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="change-icons"
        onClick={(e) => {
          e.stopPropagation();
          selectOnLeftChange();
        }}
      />
      <div>
        {/* 「年」的選單 */}
        <select
          className="date-select-box"
          name=""
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
          onClick={(e) => {
            e.stopPropagation();
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
          onClick={(e) => {
            e.stopPropagation();
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
      <FontAwesomeIcon
        icon={faChevronRight}
        className="change-icons"
        onClick={(e) => {
          e.stopPropagation();
          selectOnRightChange();
        }}
      />
    </div>
  );
}

export default Header;
