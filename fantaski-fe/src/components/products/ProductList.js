// 內建通用元件
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

// 組合用元件
import PageButton from "./PageButton";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";

const productFromServer = [
  {
    id: 1,
    name: "暗黑滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "此塊雪板由黑曜石製成，黑曜石產量相當稀少，其具有增強技能的力量，站上此塊雪板就能讓它帶著你滑雪，不管多高難度的動作都能輕而易舉完成。",
    image: `${PRODUCTIMAGE_URL}/allblack.jfif`,
    price: 1200,
  },
  {
    id: 2,
    name: "可愛滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "這款雪板相當適合青少年(女)或是童心未泯的諸位，卡通人物elmo在你滑雪時會輕輕播放著歡樂的音樂讓你享受其中!",
    image: `${PRODUCTIMAGE_URL}/Elmo.jfif`,
    price: 1000,
  },
  {
    id: 3,
    name: "力量滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "浩克的力量不必多說，大家眾所皆知，給正在訓練下坡加速的你前所未有的重力體驗!",
    image: `${PRODUCTIMAGE_URL}/hulk.jfif`,
    price: 1600,
  },
  {
    id: 4,
    name: "陽光滿點單板",
    category: "雪板類",
    suitable: "初體驗",
    description:
      "滿滿大海配色的雪板，就是要陽光的你在雪上也能像在海上衝浪般的自在舒適!",
    image: `${PRODUCTIMAGE_URL}/roxy_ocean.jfif`,
    price: 1400,
  },
  {
    id: 5,
    name: "藝術滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "2022最新雪板上市啦!此次以最五彩繽紛的動物---鸚鵡作為主軸，讓你邊滑雪邊欣賞腳下的絢麗鸚鵡",
    image: `${PRODUCTIMAGE_URL}/Women's Snowboards.jfif`,
    price: 2000,
  },
];

function ProductList({
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
              <img src={v.image} alt="" className="size" />
            </div>
            <div className="product_description">
              <p>{v.name}</p>
              <p>{v.description}</p>
              <p>適合對象 : {v.suitable}</p>
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
                  value={`${v.image}|${v.category}|${v.name}|${v.price}`}
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
        <h3 className="product_title pl-1">雪板類</h3>
        {display}
        <PageButton
          setPageButton={setPageButton}
          pageButton={pageButton}
          handlePageButton={handlePageButton}
          products={products}
        />
      </div>
    </>
  );
}

export default withRouter(ProductList);
