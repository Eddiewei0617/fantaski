import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config/url";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { CATEGORY_WORD } from "../../config/StatusShortcut";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

import MemberList from "../../components/member/MemberList";
function MemberCollect({ setItemNumber, memberInfo, userInfo }) {
  let storage = localStorage;
  // 抓到storage裡面有幾樣商品的字串後，用split將字串轉成陣列就能顯示出有幾個了
  function handleAddNumber() {
    let itemString = storage["addItemList"];
    let items = itemString.substr(0, itemString.length - 2).split(", ");
    setItemNumber(items.length);
    // console.log("click", itemNumber);
  }
  // 一進到頁面(包括重新整理)，判判斷如果addItemList裡面是空字串，就設購物車數字為0，不然就正常呼叫函式
  useEffect(() => {
    if (storage["addItemList"] === "" || storage["addItemList"] == null) {
      setItemNumber(0);
    } else {
      handleAddNumber();
    }
  }, []);

  // 設refresh是為了讓點下取消收藏後有事件發生，才能觸發刪除整欄畫面的事件
  const [forRefresh, setForRefresh] = useState();
  // 請後端拿資料庫product JOIN produtc_collection的資料
  const [memberCollectList, setMemberCollectList] = useState([]);
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/member/membercollection`, {
      withCredentials: true,
    });
    setMemberCollectList(res.data);
  }, [forRefresh]);

  // 點擊取消收藏後，傳回後端刪除資料表資料
  async function handleCancelCollection(v) {
    try {
      let res = await axios.post(
        `${API_URL}/products/cancelcollection`,
        {
          productId: v.id,
        },
        { withCredentials: true }
      );
      // console.log("product", v.id);
    } catch (err) {
      console.error("資料傳送錯誤", err);
    }
  }
  // 點擊取消收藏後，移除畫面該欄
  function removeFromCollectionList(itemToRemove) {
    setMemberCollectList((memberCollectList) =>
      memberCollectList.filter((v, i) => {
        return v.id !== itemToRemove;
      })
    );
  }

  // 已加入購物車之彈跳視窗
  function alreadyinCart() {
    Swal.fire({
      // title: "Sweet!",
      text: "您已將此商品加入購物車",
      imageUrl: `${PRODUCTIMAGE_URL}/jerry_mouse.jpg`,
      imageWidth: 220,
      imageHeight: 300,
      imageAlt: "已加入購物車圖",
      icon: "error",
    });
  }

  return (
    <>
      <div>
        <MemberList setItemNumber={setItemNumber} page={4} />
      </div>
      <table className="member_collect_bg mt-4">
        <thead className="collect_header">
          <tr>
            <th className="col-2">商品圖片</th>
            <th className="col-2">商品種類</th>
            <th className="col-2">商品名稱</th>
            <th className="col-2">商品描述</th>
            <th className="col-2">商品價格</th>
            <th className="col-2"></th>
          </tr>
        </thead>
        <tbody className="member_collect">
          {memberCollectList.map((v, i) => {
            return (
              <>
                <tr key={v.id} className="row">
                  <td className="cart_image">
                    <img src={`${PRODUCTIMAGE_URL}/${v.image}`} alt="" />
                  </td>
                  <td className="col">{CATEGORY_WORD[v.category_id]}</td>
                  <td className="col">{v.name}</td>
                  <td className="col collect_content">{v.content}</td>
                  <td className="col">NT$ {v.price}</td>
                  <td className="col collect_buttons">
                    <Button
                      className="collect_cancel"
                      onClick={() => {
                        handleCancelCollection(v);
                        removeFromCollectionList(`${v.id}`);
                        setForRefresh(Math.random());
                      }}
                    >
                      取消收藏
                    </Button>
                    <Button
                      id={v.id}
                      className="collect_cart"
                      onClick={(e) => {
                        let itemId = `p-${v.id}`;
                        let productInfo = e.currentTarget.children[0].value;
                        // 開始把點"加到購物車"的商品存入storage
                        if (storage[itemId]) {
                          alreadyinCart();
                        } else {
                          storage.setItem(itemId, productInfo);
                          storage["addItemList"] += `${itemId}, `;
                        }
                        handleAddNumber();
                      }}
                    >
                      加入購物車
                      <input
                        type="hidden"
                        value={`${PRODUCTIMAGE_URL}/${v.image}|B|${v.name}|${v.price}|2021-11-15|1`}
                      />
                    </Button>
                  </td>
                </tr>
                <div className="collect_separate"></div>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default MemberCollect;
