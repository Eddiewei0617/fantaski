// 內建通用元件
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { CATEGORY_WORD } from "../../config/StatusShortcut";

// 組合用元件
import PageButton from "./PageButton";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";

function ProductList({
  clickToChangeToggle,
  setToggleState,
  toggleState,
  setItemNumber,
  itemNumber,
  onClick,
  categoryId,
}) {
  // 點加入購物車後從到locaStorage
  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
  }
  // 抓到storage裡面有幾樣商品的字串後，用split將字串轉成陣列就能顯示出有幾個了
  function handleAddNumber() {
    let itemString = storage["addItemList"];
    let items = itemString.substr(0, itemString.length - 2).split(", ");
    setItemNumber(Number(items.length));
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
  useEffect(async () => {
    let res = await axios.post(
      "http://localhost:3001/api/products/productsInfoList",
      { category: categoryId }
    );
    // 先假設一個productList空[]放單頁商品的；totalProductList空[]是放全部商品的
    // 判斷式 : 如果一頁商品數量除以5的餘數是0，那就把這些商品push進總陣列，然後把小陣列歸零，繼續跑迴圈
    let productList = [];
    let totalProductList = [];
    for (let i = 0; i < res.data.length; i++) {
      productList.push(res.data[i]);
      if ((i + 1) % 5 === 0) {
        totalProductList.push(productList);
        productList = [];
      }
    }
    totalProductList.push(productList);
    setProducts(totalProductList[pageNow - 1]);
  }, [pageNow, categoryId]);

  const display = (
    <ul className="all_image_l ">
      {products.map((v, i) => {
        return (
          <li key={v.id} className="list-unstyled ">
            <div className="product_image_l">
              <button
                id={i + 1}
                className={`${
                  toggleState[i + 1] === true && "collect_tagged"
                }  collect_tag`}
                onClick={clickToChangeToggle}
              >
                <BsTagsFill />
              </button>
              <img
                src={`${PRODUCTIMAGE_URL}/${v.image}`}
                alt=""
                className="size"
              />
            </div>
            <div className="product_description">
              <p>{v.name}</p>
              <p>{v.content}</p>
              {/* <p>適合對象 : {v.suitable}</p> */}
              <p>租購價 : NT$ {v.price}</p>

              <Button
                id={v.id}
                className="cart"
                onClick={(e) => {
                  let itemId = v.id;
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
                }}
              >
                加入購物車
                <input
                  type="hidden"
                  value={`${PRODUCTIMAGE_URL}/${v.image}|裝備租賃|${v.name}|${v.price}|2021-11-15|1`}
                />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
  const [pageButton, setPageButton] = useState(0);
  function handlePageButton(e) {
    let pageId = Number(e.target.id);
    setPageButton(pageId);
  }

  return (
    <>
      <div>
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
