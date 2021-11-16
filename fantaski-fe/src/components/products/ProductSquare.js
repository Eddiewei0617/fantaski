// 內建通用型元件
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 組合型元件
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";
import { CATEGORY_WORD } from "../../config/StatusShortcut";

// 手風琴不同種類商品的components切換
import Snowboards from "./1Snowboards";
import Skis from "./2Skis";
import Jackets from "./3.Jackets";
import Boots from "./4Boots";

function ProductSquare({
  clickToChangeToggle,
  toggleState,
  setItemNumber,
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
  // const [products, setProducts] = useState([]);
  // useEffect(async () => {
  //   let res = await axios.get(
  //     "http://localhost:3001/api/products/productsInfoList"
  //   );
  //   setProducts(res.data);
  // }, []);

  // const display = (
  //   <ul className="all_image_s ">
  //     {products.map((v, i) => {
  //       return (
  //         <li key={v.id} className="list-unstyled">
  //           <div className="product_image_s  ">
  //             <button
  //               id={i + 1}
  //               className={`${
  //                 toggleState[i + 1] === true && "collect_tagged"
  //               }  collect_tag`}
  //               onClick={clickToChangeToggle}
  //             >
  //               <BsTagsFill title="加入收藏" />
  //             </button>
  //             <img
  //               src={`${PRODUCTIMAGE_URL}/${v.image}`}
  //               alt=""
  //               className="size"
  //             />
  //           </div>
  //           <p className="mt-3 h5">{v.name}</p>
  //           <p className="h5">NT$ {v.price}</p>

  //           <Button
  //             id={v.id}
  //             className="cart"
  //             onClick={(e) => {
  //               let itemId = v.id;
  //               let productInfo = e.currentTarget.children[0].value;
  //               // console.log("value", productInfo); //http://localhost:3000/assets/images_product/allblack.jfif|雪板類|暗黑滿點單板|1200

  //               // 開始把點"加到購物車"的商品存入storage
  //               if (storage[itemId]) {
  //                 alert("您已將此物品加入購物車");
  //               } else {
  //                 storage.setItem(itemId, productInfo);
  //                 storage["addItemList"] += `${itemId}, `;
  //               }
  //               handleAddNumber();
  //             }}
  //           >
  //             加入購物車
  //             <input
  //               type="hidden"
  //               value={`${PRODUCTIMAGE_URL}/${v.image}|B|${v.name}|${v.price}|2021-11-15|1`}
  //             />
  //           </Button>
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );

  // --------------------------------------------------------------------------

  return (
    <>
      <div>
        {/* <h3 className="product_title pl-1">雪板類</h3> */}
        {/* {display} */}
        {categoryId === 1 && (
          <Snowboards
            toggleState={toggleState}
            clickToChangeToggle={clickToChangeToggle}
            handleAddNumber={handleAddNumber}
          />
        )}
        {categoryId === 2 && (
          <Skis
            toggleState={toggleState}
            clickToChangeToggle={clickToChangeToggle}
            handleAddNumber={handleAddNumber}
          />
        )}
        {categoryId === 3 && (
          <Jackets
            toggleState={toggleState}
            clickToChangeToggle={clickToChangeToggle}
            handleAddNumber={handleAddNumber}
          />
        )}
        {categoryId === 4 && (
          <Boots
            toggleState={toggleState}
            clickToChangeToggle={clickToChangeToggle}
            handleAddNumber={handleAddNumber}
          />
        )}
      </div>
    </>
  );
}

export default ProductSquare;
