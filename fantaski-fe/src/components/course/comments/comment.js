import React, { useRef, useState, useEffect } from "react";
import "use-state-promise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { COURSE_IMG_URL } from "../../../config/url";

const starMapping = {
  1: ["full-star", "empty-star", "empty-star", "empty-star", "empty-star"],
  2: ["full-star", "full-star", "empty-star", "empty-star", "empty-star"],
  3: ["full-star", "full-star", "full-star", "empty-star", "empty-star"],
  4: ["full-star", "full-star", "full-star", "full-star", "empty-star"],
  5: ["full-star", "full-star", "full-star", "full-star", "full-star"],
};
function Comment(props) {
  const { comment } = props;
  const [hasEllipsis, setHasEllipsisPromise, setHasEllipsis] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const commentHeight = useRef();
  const heightRef = useRef(0);

  //getComputedStyle() 方法用于获取指定元素的 CSS 样式。
  //获取的样式是元素在浏览器中最终渲染效果的样式。

  const ifNeedMore = async () => {
    //原始文字高度
    heightRef.current = parseInt(
      getComputedStyle(commentHeight.current).height
    );
    //加入ellipsis style
    await setHasEllipsisPromise(true);
    let height = parseInt(getComputedStyle(commentHeight.current).height);
    setHasMore(heightRef.current > height);
  };

  useEffect(() => {
    ifNeedMore();
  }, []);
  return (
    <>
      <div className="row comment-wrapper">
        <div className="comment-avatar-box col-1">
          <img
            className="object-fit-height"
            src={`${COURSE_IMG_URL}/avatar-default.png`}
            alt=""
          />
        </div>
        <div className="col-1">{comment.member}</div>
        <div className="col-8">{comment.date}</div>
        <div className="col-2 text-right">
          {starMapping[comment.star].map((item, i) => {
            return (
              <>
                <FontAwesomeIcon key={i} icon={faStar} className={item} />
              </>
            );
          })}
        </div>
        <div
          className={`col-12 comment-box ${hasEllipsis && "ellipsis"}`}
          ref={commentHeight}
        >
          {comment.content}
        </div>
        {hasMore && (
          <span
            href="#/"
            className="col-12 commit-more"
            onClick={() => {
              setHasEllipsisPromise(!hasEllipsis);
              setHasMore(!hasMore);
            }}
          >
            ...more
          </span>
        )}
      </div>
    </>
  );
}

export default Comment;
