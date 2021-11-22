import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config/url";
import { PRODUCTIMAGE_URL } from "../../config/url";
import MemberList from "../../components/member/MemberList";
function MemberCollect() {
  const [memberCollectList, setMemberCollectList] = useState([]);
  useEffect(async () => {
    let res = await axios.post(`${API_URL}/member`);
  }, []);

  return (
    <>
      <div>
        <MemberList />
      </div>
      <div className="member_collect_bg">
        <div className="row header">
          <div className="col-sm">商品圖片</div>
          <div className="col-sm">商品種類</div>
          <div className="col-sm">商品名稱</div>
          <div className="col-sm">商品描述</div>
          <div className="col-sm">商品價格</div>
          <div className="col-sm"></div>
        </div>
        <div className="member_collect">
          <div className="row ">
            <div className="cart_image">
              <img src={`${PRODUCTIMAGE_URL}/allblack.jfif`} alt="" />
            </div>
            <div className="col">單板</div>
            <div className="col">暗黑滿點單板</div>
            <div className="col">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
            <div className="col">NT$ 1600</div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  );
  {
    /* <div>
      <MemberList />
      <div className="text-center">
        <h1>我的收藏</h1>
      </div>
    </div> */
  }
}

export default MemberCollect;
