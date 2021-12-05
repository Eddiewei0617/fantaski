// 內建通用元件
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { CATEGORY_WORD } from "../../config/StatusShortcut";
import { API_URL } from "../../config/url";

// 組合用元件
import PageButton from "./PageButton";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";

const moment = require("moment");
function ProductList({
  setItemNumber,
  onClick,
  categoryId,
  memberInfo,
  collected,
  setCollectUpdate,
  handleCollect,
  handleChecked,
  handleAddNumber,
}) {
  // 點加入購物車後從到locaStorage
  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
  }

  // 一進到頁面(包括重新整理)，判判斷如果addItemList裡面是空字串，就設購物車數字為0，不然就正常呼叫函式
  useEffect(() => {
    if (storage["addItemList"] === "") {
      setItemNumber(0);
    } else {
      handleAddNumber();
    }
  }, []);

  // 讓商品顯示在頁面上
  const [products, setProducts] = useState([]);
  const [pageNow, setPageNow] = useState(1); // 為了偵測在哪一頁，然後切換頁面會顯示不同商品
  const [allRes, setAllRes] = useState();
  useEffect(async () => {
    try {
      let res = await axios.get(
        `${API_URL}/products/productsInfoList/${categoryId}`
      );
      setAllRes(res.data);
      setPageNow(1);
      setPageButton(1);
    } catch (e) {
      console.error(e);
    }
  }, [categoryId]);

  useEffect(() => {
    try {
      // 先假設一個productList空[]放單頁商品的；totalProductList空[]是放全部商品的
      // 判斷式 : 如果一頁商品數量除以5的餘數是0，那就把這些商品push進總陣列，然後把小陣列歸零，繼續跑迴圈
      let productList = [];
      let totalProductList = [];
      if (allRes) {
        for (let i = 0; i < allRes.length; i++) {
          productList.push(allRes[i]);
          if ((i + 1) % 5 === 0) {
            totalProductList.push(productList);
            productList = [];
          }
        }
        totalProductList.push(productList);
        setProducts(totalProductList[pageNow - 1]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [pageNow, allRes]);

  // 為了讓商品被加入購物車有動畫效果
  const [flyCart, setFlyCart] = useState(0);
  // 讓一開始的訂購日期顯示在當天
  let orderDate = moment().format("YYYY-MM-DD");

  const display = (
    <ul className="all_image_l ">
      {products.map((v, i) => {
        return (
          <li key={v.id} className="list-unstyled ">
            <div
              className={`product_image_l  ${
                (products[i].category_id === 3 ||
                  products[i].category_id === 4 ||
                  products[i].category_id === 5 ||
                  products[i].category_id === 6 ||
                  products[i].category_id === 7 ||
                  products[i].category_id === 8) &&
                "product_image_jackets"
              }`}
            >
              <button
                id={i + 1}
                className={`
                  ${collected.map((collections) => {
                    if (
                      memberInfo &&
                      collections.member_id === memberInfo[0].id &&
                      collections.product_id === v.id
                    ) {
                      return " collect_tagged "; // " "裡前後的空格不可以少，不然和其他被選到收藏的商品className黏在一起就抓不到了
                    }
                  })} 
                   collect_tag`}
                onClick={(e) => {
                  handleCollect(v);
                  e.currentTarget.className.includes("collect_tagged")
                    ? handleCollect(v)
                    : handleChecked();
                  setCollectUpdate(Math.random());
                }}
              >
                <BsTagsFill title="加入收藏" />
              </button>
              <img
                src={`${PRODUCTIMAGE_URL}/${v.image}`}
                alt=""
                className={`${flyCart == v.id && "scale-out-tr"}   size `}
              />
            </div>
            <div className="product_description">
              <p>{v.name}</p>
              <p>{v.content}</p>
              <p>
                租購價 : <span> NT$ {v.price}</span>
              </p>

              <Button
                id={v.id}
                className="cart"
                onClick={(e) => {
                  let itemId = `p-${v.id}`;
                  let productInfo = e.currentTarget.children[0].value;
                  // console.log("value", productInfo); //http://localhost:3000/assets/images_product/allblack.jfif|雪板類|暗黑滿點單板|1200

                  // 開始把點"加到購物車"的商品存入storage
                  if (storage[itemId]) {
                    alert("您已將此物品加入購物車");
                  } else {
                    storage.setItem(itemId, productInfo);
                    storage["addItemList"] += `${itemId}, `;
                  }
                  handleAddNumber();
                  setFlyCart(Number(`${v.id}`));
                }}
              >
                加入購物車
                <input
                  type="hidden"
                  value={`${PRODUCTIMAGE_URL}/${v.image}|B|${v.name}|${v.price}|${orderDate}|1`}
                />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );

  // 下方頁碼切換
  const [pageButton, setPageButton] = useState(0);
  function handlePageButton(e) {
    let pageId = Number(e.target.id);
    setPageButton(pageId);
  }

  return (
    <>
      <div className="product-area">
        <h3 className="product_title pl-1">{CATEGORY_WORD[categoryId]}</h3>
        {display}
        <PageButton
          pageNow={pageNow}
          setPageNow={setPageNow}
          setPageButton={setPageButton}
          pageButton={pageButton}
          handlePageButton={handlePageButton}
          products={products}
          onClick={onClick} // 點完之後往上跳到商品適當位置
        />
      </div>
    </>
  );
}

export default withRouter(ProductList);
