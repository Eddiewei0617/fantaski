// 內建通用型元件
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// 組合型元件
import PageButton from "../products/PageButton";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";

const productFromServer = [
  {
    id: 1,
    name: "暗黑滿點單板",
    category: "雪板類",
    image: `${PRODUCTIMAGE_URL}/allblack.jfif`,
    price: 1200,
  },
  {
    id: 2,
    name: "可愛滿點單板",
    category: "雪板類",
    image: `${PRODUCTIMAGE_URL}/Elmo.jfif`,
    price: 1000,
  },
  {
    id: 3,
    name: "力量滿點單板",
    category: "雪板類",
    image: `${PRODUCTIMAGE_URL}/hulk.jfif`,
    price: 1600,
  },
];

function ProductSquare({
  clickToChangeToggle,
  setToggleState,
  toggleState,
  setItemNumber,
  itemNumber,
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
  useEffect(() => {
    setProducts(productFromServer);
  }, []);

  const display = (
    <ul className="all_image_s ">
      {products.map((v, i) => {
        return (
          <li key={v.id} className="list-unstyled">
            <div className="product_image_s  ">
              <button
                id={i + 1}
                className={`${
                  toggleState[i + 1] === true && "collect_tagged"
                }  collect_tag`}
                onClick={clickToChangeToggle}
              >
                <BsTagsFill title="加入收藏" />
              </button>
              <img src={v.image} alt="" className="size" />
            </div>
            <p className="mt-3 h5">{v.name}</p>
            <p className="h5">NT$ {v.price}</p>

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
                value={`${v.image}|${v.category}|${v.name}|${v.price}`}
              />
            </Button>
          </li>
        );
      })}
    </ul>
  );

  // 下方頁面變換的功能
  const [pageButton, setPageButton] = useState(0);
  function handlePageButton(e) {
    let pageId = Number(e.target.id);
    setPageButton(pageId);
  }

  // --------------------------------------------------------------------------
  return (
    <>
      <div>
        <h3 className="product_title pl-1">雪板類</h3>
        {display}
        <PageButton
          setPageButton={setPageButton}
          pageButton={pageButton}
          handlePageButton={handlePageButton}
        />
      </div>
    </>
  );
}

export default ProductSquare;
