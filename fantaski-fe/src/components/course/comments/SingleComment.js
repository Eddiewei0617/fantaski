import React, { useRef, useState, useEffect } from "react";
import "use-state-promise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { COURSE_IMG_URL } from "../../../config/url";
import { starMapping } from "../moduleList";
import moment from "moment";

function SingleComment(props) {
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
            src={`${COURSE_IMG_URL}/snowman.svg`}
            alt=""
          />
        </div>
        <div className="col-4">{comment.name}</div>
        <div className="col-md-5 col-sm-4">
          {comment.comment_last_update === null
            ? ""
            : moment(comment.comment_last_update).format("YYYY-MM-DD HH:mm")}
        </div>
        <div className="col-md-2 col-sm-3 text-right">
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
          {comment.comment}
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

export default SingleComment;
