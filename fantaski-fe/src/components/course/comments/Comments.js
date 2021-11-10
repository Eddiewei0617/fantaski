import React from "react";
import SingleComment from "./SingleComment";
const comments = [
  {
    member: "Sam",
    member_img: "",
    date: "2020-01-23 17:18",
    star: 4,
    content:
      "在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!",
  },
  {
    member: "Sam1",
    member_img: "",
    date: "2020-01-23 17:18",
    star: 1,
    content:
      "在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!",
  },
  {
    member: "Sam2",
    member_img: "",
    date: "2020-01-23 17:18",
    star: 5,
    content:
      "在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!",
  },
  {
    member: "Sam3",
    member_img: "",
    date: "2020-01-23 17:18",
    star: 3,
    content:
      "在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!",
  },
  {
    member: "Sam4",
    member_img: "",
    date: "2020-01-23 17:18",
    star: 3,
    content:
      "在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!",
  },
  {
    member: "Sam5",
    member_img: "",
    date: "2020-01-23 17:18",
    star: 3,
    content:
      "在教練清楚的解說與愉快的帶領下學會很很猛的滑雪技術，非常推薦來FANTASKI!",
  },
];

function Comments({ showCourse }) {
  //後端依據showCourse抓評論回填
  return (
    <>
      <div className="comments-wrapper">
        {comments.map((commit, i) => {
          return (
            <>
              <SingleComment key={i} comment={commit} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default Comments;
