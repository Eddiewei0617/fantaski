import React from "react";
import moment from "moment";

const today = moment().format("YYYY-MM-DD");

//某年是否為閏年(400可整除-1600;100不可整除;4可整除)
function isLeapYear(year) {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  } else {
    return false;
  }
}
//判斷某月有幾天
function daysInMonth(year, month) {
  if (month === 0) month = 12;
  let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day = days[month - 1];
  if (month === 2 && isLeapYear(year) === true) day = 29;
  return day;
}
//判斷某年某月1號星期幾
function firstWeekday(year, month) {
  let myDate = new Date(year, month - 1, 1);
  return myDate.getDay();
}
//判斷本月1號前上個月有多少天並回傳陣列
const weekDayInLastMonth = (year, month) => {
  let lastMonth = month - 1;
  let yearForLastMonth = year;
  if (lastMonth === 0) {
    lastMonth = 12;
    yearForLastMonth -= 1;
  }
  //上個月有幾天
  let daysInLastMonth = daysInMonth(yearForLastMonth, lastMonth);
  //這個月1號是星期幾
  let firstDayInThisMonth = firstWeekday(year, month);
  let days = [];
  //本月要顯示幾天上個月的日期
  for (let i = 0; i < firstDayInThisMonth; i++) {
    let day = daysInLastMonth - firstDayInThisMonth + 1;
    days.push({ y: Number(yearForLastMonth), m: Number(lastMonth), d: day });
    daysInLastMonth++;
  }
  return days;
};
//本月的天數陣列
const daysInThisMonth = (year, month) => {
  let days = [];
  let j;
  for (let i = 1; i <= daysInMonth(year, month); i++) {
    days.push({ y: Number(year), m: Number(month), d: i });
  }
  return days;
};
//次月的天數陣列
const daysInNextMonth = (daysThisLastMonth, month, year) => {
  let yearForNextMonth = year;
  let nextMonth = Number(month) + 1;
  if (month === 12) {
    yearForNextMonth += 1;
    nextMonth = 1;
  }
  let daysNextMonth = 7 - (daysThisLastMonth % 7);
  let days = [];
  for (let i = 1; i <= daysNextMonth; i++) {
    days.push({ y: Number(yearForNextMonth), m: Number(nextMonth), d: i });
  }
  return days;
};

function DatesInMonth(props) {
  const {
    selectedYear,
    selectedMonth,
    day,
    setCustomerChoose,
    setShowCalendar,
    setShowCalendarFloat,
  } = props;

  let totalDaysLT = weekDayInLastMonth(selectedYear, selectedMonth).concat(
    daysInThisMonth(selectedYear, selectedMonth, day)
  );
  //一整個日曆的天數存成一個陣列
  let totalDays = totalDaysLT.concat(
    daysInNextMonth(totalDaysLT.length, selectedMonth, selectedYear)
  );
  //整個日曆的天數再分成七天一組，渲染時：先map一整排，裡面再map一整排的天數(幾號)
  let totaldata = [],
    tempdata = [];
  for (let i = 0; i < totalDays.length; i++) {
    tempdata.push(totalDays[i]);
    if (i % 7 === 6) {
      totaldata.push(tempdata);
      tempdata = [];
    }
  }
  const handleChange = (year, month, day) => {
    console.log(setShowCalendarFloat, setShowCalendar);
    if (setShowCalendarFloat === undefined) {
      setShowCalendar(false);
    } else if (setShowCalendar === undefined) {
      setShowCalendarFloat(false);
    }
    let newValue = `${year}-${month}-${day}`;
    setCustomerChoose((cur) => {
      return { ...cur, date: newValue };
    });
  };
  function handleStyleChange(y, m, d) {
    if (d < 10) d = `0${d}`;
    let lastNextStyle = "calendar-dates-box-last";
    let thisMonthStyle = "calendar-dates-box-this";
    let thisMonth = `${y}-${m}`;
    let selectMonth = `${selectedYear}-${selectedMonth}`;
    let Columntoday = `${y}-${m}-${d}`;
    if (thisMonth === selectMonth) {
      if (Columntoday !== today) {
        return thisMonthStyle;
      } else {
        let todayStyle = "calendar-dates-box-this-today";
        return thisMonthStyle, todayStyle;
      }
    } else if (thisMonth !== selectMonth) {
      return lastNextStyle;
    }
  }
  return (
    <>
      {totaldata.map((vr, vri) => {
        return (
          <>
            <tr key={vri}>
              {vr.map((vc, vci) => {
                return (
                  <>
                    <td
                      className={`calendar-dates-box ${handleStyleChange(
                        vc.y,
                        vc.m,
                        vc.d
                      )}`}
                      onClick={() => handleChange(vc.y, vc.m, vc.d)}
                    >
                      {vc.d}
                    </td>
                  </>
                );
              })}
            </tr>
          </>
        );
      })}
    </>
  );
}

export default DatesInMonth;
