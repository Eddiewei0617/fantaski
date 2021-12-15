import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  getDailyCourseLeft,
  courseIdName,
  getCourseInCarts,
} from "../moduleList";
import Swal from "sweetalert2";

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
  let daysInLastMonth = daysInMonth(yearForLastMonth, lastMonth); //30
  //這個月1號是星期幾
  let firstDayInThisMonth = firstWeekday(year, month); //3
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
  let yearForNextMonth = Number(year);
  let nextMonth = Number(month) + 1;
  if (nextMonth >= 13) {
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
  const [dailyCourseLeft, setDailyCourseLeft] = useState(null);
  const [stuLimit, setStuLimit] = useState(0);

  //後端依據showCourse抓剩餘人數後回傳並存到dailyCourseLeft[{2021:12-25:1}, {2021-12-20:3}]
  useEffect(() => {
    let firstDate = `${totalDays[0]["y"]}-${totalDays[0]["m"]}-${totalDays[0]["d"]}`;
    let totalDaysLen = totalDays.length;
    let lastDate = `${totalDays[totalDaysLen - 1].y}-${
      totalDays[totalDaysLen - 1].m
    }-${totalDays[totalDaysLen - 1].d}`;
    getDailyCourseLeft(
      firstDate,
      lastDate,
      courseIdName[showCourse].id,
      setDailyCourseLeft, //課程剩餘人數物件
      setStuLimit //課程人數上限
    );
  }, [selectedYear, selectedMonth, customerChoose]);
  useEffect(() => {
    if (userInfo && userInfo.code !== 1201) {
      getCourseInCarts(
        courseIdName[showCourse].id,
        userInfo.id,
        setIfAddCart,
        setCustomerChoose
      );
    }
  }, [userInfo]);

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
  //使用者點選課程日期
  const handleChange = (y, m, d) => {
    if (ifAddCart) {
      Swal.fire("已加入購物車，請至購物車修改");
    } else {
      if (d < 10) d = `0${d}`;
      if (m < 10) m = `0${m}`;
      let Columntoday = `${y}-${m}-${d}`;
      if (Columntoday >= today) {
        if (dailyCourseLeft[Columntoday] !== undefined) {
          let left = Number(stuLimit) - Number(dailyCourseLeft[Columntoday]);
          if (left <= 0) left = 0;
          if (left <= 0) {
            Swal.fire("該課程人數已滿，請選擇其他日期");
            return;
          } else if (left > 0) {
            setCustomerChoose((cur) => {
              return {
                ...cur,
                date: Columntoday,
                courseLeft: left,
                courseLimit: stuLimit,
              };
            });
          }
        } else {
          setCustomerChoose((cur) => {
            return {
              ...cur,
              date: Columntoday,
              courseLeft: stuLimit,
              courseLimit: stuLimit,
            };
          });
        }
        if (setShowCalendarFloat === undefined) {
          setShowCalendar(false);
        } else if (setShowCalendar === undefined) {
          setShowCalendarFloat(false);
        }
      }
    }
  };
  //依日期為本月或上下月給不同style
  function handleStyleChange(y, m, d) {
    if (d < 10) d = `0${d}`;
    if (m < 10) m = `0${m}`;
    let selectedYearVar = selectedYear;
    let selectedMonthVar = selectedMonth;
    if (selectedMonthVar < 10) selectedMonthVar = `0${selectedMonthVar}`;
    let lastNextStyle = "calendar-dates-box-last";
    let thisMonthStyle = "calendar-dates-box-this";
    let thisMonth = `${y}-${m}`;
    let selectMonth = `${selectedYearVar}-${selectedMonthVar}`;
    let columnToday = `${y}-${m}-${d}`;
    if (thisMonth === selectMonth) {
      if (columnToday > today) {
        return thisMonthStyle;
      } else if (columnToday < today) {
        return lastNextStyle;
      } else {
        let todayStyle = "calendar-dates-box-this-today";
        return thisMonthStyle, todayStyle;
      }
    } else if (thisMonth !== selectMonth) {
      return lastNextStyle;
    }
  }
  //依據日期回填剩餘人數
  function dailyLeft(y, m, d) {
    if (d < 10) d = `0${d}`;
    if (m < 10) m = `0${m}`;
    let theDate = `${y}-${m}-${d}`;
    //狀態還沒loading完成前
    if (dailyCourseLeft === null) {
      return;
      //日期小於今天的不顯示剩餘人數
    } else if (theDate < today) {
      return;
    } else {
      //left = 已購買的課程剩餘人數
      if (dailyCourseLeft.hasOwnProperty(theDate)) {
        let left = stuLimit - dailyCourseLeft[theDate];
        if (left < 0) left = 0;
        //已在購物車內尚未購買的人數
        if (
          customerChoose.othersCart &&
          customerChoose.othersCart.hasOwnProperty(theDate)
        ) {
          left -= customerChoose.othersCart[theDate];
        }
        return `剩${left}人`;
        //在登入者的購物車內的人數
        // if (customerChoose.addCartDate == theDate) {
        //   return `剩${left - customerChoose.addCartAmount}人`;
        // } else {
        //   return `剩${left}人`;
        // }
      } else {
        let stuLimitVar = stuLimit;
        if (
          customerChoose.othersCart &&
          customerChoose.othersCart.hasOwnProperty(theDate)
        ) {
          stuLimitVar -= customerChoose.othersCart[theDate];
        }
        return `剩${stuLimitVar}人`;
        // if (customerChoose.addCartDate == theDate) {
        //   return `剩${stuLimitVar - customerChoose.addCartAmount}人`;
        // } else {
        //   return `剩${stuLimitVar}人`;
        // }
      }
    }
  }
  //依據剩餘人數決定bg color
  function bgColorByLeft(leftFunction) {
    if (leftFunction) {
      let leftAmount = leftFunction.replace(/[^0-9]/gi, "");
      if (leftAmount <= 3 && leftAmount > 0) {
        return "bgLessThan3";
      } else if (leftAmount <= 0) {
        return "bgLessThan0";
      }
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
                      )}  ${bgColorByLeft(dailyLeft(vc.y, vc.m, vc.d))}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange(vc.y, vc.m, vc.d);
                      }}
                    >
                      {vc.d}
                      <div className={`daily-left`}>
                        <span>{dailyLeft(vc.y, vc.m, vc.d)}</span>
                      </div>
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
