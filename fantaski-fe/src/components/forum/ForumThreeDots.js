import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFileEarmarkPlus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import { delPostInfo, getPosterInfo } from "./moduleList";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";
import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

function ForumThreeDots(props) {
  const { setForumModalShow, forum_id, setForumCategory, userInfo } = props;
  useEffect(() => {
    setForumCategory((cur) => {
      return { ...cur, lastUpdate: false };
    });
  }, []);

  if (userInfo === null) {
    return <div></div>;
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="forum-more-button">
          <BsThreeDotsVertical className="forum-dots" />
        </Dropdown.Toggle>
        {/* 文章列表只顯示新增選項 */}
        {!forum_id ? (
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/forum/new-post">
              <div
                onClick={(e) => {
                  if (userInfo && userInfo.code === 1201) {
                    e.preventDefault();
                    swalWithBootstrapButtons
                      .fire({
                        title: "尚未登入",
                        text: "需要登入才能發文哦，是否到登入頁？",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "好",
                        cancelButtonText: "取消",
                        reverseButtons: true,
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          props.history.push("/login");
                        }
                      });
                    // let ifTransferToLogin =
                    //   window.confirm("須先登入才能發文哦！是否到登入頁？");
                    // if (ifTransferToLogin) {
                    //   e.preventDefault();
                    //   props.history.push("/login");
                    // } else if (ifTransferToLogin === false) {
                    //   e.preventDefault();
                    // }
                  }
                }}
              >
                <BsFileEarmarkPlus className="forum-dropdown-btn" />
                新增
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            {/* 文章彈跳視窗顯示編輯＆刪除 */}
            <Dropdown.Item as={Link} to="/forum/new-post" role="button">
              <BsPencilSquare className="forum-dropdown-btn" />
              編輯
            </Dropdown.Item>
            <div
              onClick={(e) => {
                swalWithBootstrapButtons
                  .fire({
                    title: "刪除文章",
                    text: "文章刪除後無法復原，是否確定刪除？",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "刪除",
                    cancelButtonText: "取消",
                    reverseButtons: true,
                  })
                  .then(async (result) => {
                    if (result.isConfirmed) {
                      setForumModalShow(false);
                      await delPostInfo(forum_id);
                      setForumCategory((cur) => {
                        return { ...cur, lastUpdate: true, nowaForumInfo: "" };
                      });
                      swalWithBootstrapButtons.fire(
                        "Deleted!",
                        "文章已刪除",
                        "success"
                      );
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      setForumModalShow(true);
                      e.preventDefault();
                    }
                  });
                // if (!window.confirm("確定刪除？")) {
                //   e.preventDefault();
                // } else {
                //   setForumCategory((cur) => {
                //     return { ...cur, lastUpdate: true };
                //   });
                //   delPostInfo(forum_id);
                //   setForumModalShow(false);
                // }
              }}
            >
              <Dropdown.Item as={Link} to="/forum">
                <BsTrash className="forum-dropdown-btn" />
                刪除
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </>
  );
}

export default withRouter(ForumThreeDots);
