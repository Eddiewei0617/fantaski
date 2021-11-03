import React from "react";
import * as moment from "../../../node_modules/moment";

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
  //上個月有幾天
  let daysInLastMonth = daysInMonth(year, month - 1);
  //這個月1號是星期幾
  let firstDayInThisMonth = firstWeekday(year, month);
  let days = [];
  //本月要顯示幾天上個月的日期
  for (let i = 0; i < firstDayInThisMonth; i++) {
    days.push(
      `<a href="#/" key = ${month - 1}_${i} class="text-secondary">${
        daysInLastMonth - firstDayInThisMonth + 1
      }</a>`
    );
    daysInLastMonth++;
  }
  return days;
};
//本月的天數陣列
const daysInThisMonth = (year, month, day) => {
  let days = [];
  let j;
  for (let i = 1; i <= daysInMonth(year, month); i++) {
    if (i < 10) j = `0${i}`;
    let selectedDay = `${year}-${month}-${j}`;
    if (selectedDay !== today) {
      days.push(`<a href="#/" key = ${month}_${i} class="text-dark">${i}</a>`);
    } else {
      days.push(
        `<a href="#/" key = ${month}_${i} class="text-danger">${i}</a>`
      );
    }
  }
  return days;
};
const daysInNextMonth = (daysThisLastMonth, month) => {
  let daysNextMonth = 7 - (daysThisLastMonth % 7);
  let days = [];
  for (let i = 1; i <= daysNextMonth; i++) {
    days.push(
      `<a href="#/" key = ${month + 1}_${i} class="text-secondary">${i}</a>`
    );
  }
  return days;
};
function DatesInMonth(props) {
  const { selectedYear, selectedMonth, day } = props;
  let totalDaysLT = weekDayInLastMonth(selectedYear, selectedMonth).concat(
    daysInThisMonth(selectedYear, selectedMonth, day)
  );
  //一整個日曆的天數存成一個陣列
  let totalDays = totalDaysLT.concat(daysInNextMonth(totalDaysLT.length));
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
  return (
    <>
      {totaldata.map((vr, vri) => {
        return (
          <>
            <tr key={vri}>
              {vr.map((vc, vci) => {
                return (
                  <>
                    {/* jsx不支援innerHTML功能(會整串標籤變字串)，需使用dangerouslySetInnerHTML */}
                    <td dangerouslySetInnerHTML={{ __html: vc }}></td>
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
