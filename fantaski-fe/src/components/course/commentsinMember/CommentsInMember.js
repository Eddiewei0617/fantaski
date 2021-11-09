import React from "react";
import CommentInMember from "./CommentInMember";

const orderCourses = [
  {
    order_id: 2021012201,
    course_name: "初體驗",
    imgSrc: "couch3.jpeg",
    amount: 2,
    booking_date: "2021-01-22",
    price: 3000,
    star: 0,
    comment: "",
  },
  {
    order_id: 2021032201,
    course_name: "雪橇車",
    imgSrc: "sled1.jpeg",
    amount: 1,
    booking_date: "2021-03-22",
    price: 3000,
    star: 0,
    comment: "",
  },
];
function CommentsInMember({ setShowCourse }) {
  return (
    <>
      <div className="order-comments-wrapper">
        {orderCourses.map((orderCourse, i) => {
          return (
            <>
              <CommentInMember
                setShowCourse={setShowCourse}
                key={i}
                orderCourse={orderCourse}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default CommentsInMember;
