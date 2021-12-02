import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { CATEGORY_WORD } from "../../config/StatusShortcut";
import { API_URL } from "../../config/url";
const moment = require("moment");
function ProductInfo({
  handleAddNumber,
  categoryId,
  memberInfo,
  collected,
  setCollectUpdate,
  handleCollect,
  handleChecked,
  userInfo,
  alreadyinCart,
}) {
  let storage = localStorage;
  // console.log("memberInfo", memberInfo);
  // 傳參數(categoryId)給後端(記得用Post!!!)，跟後端說要哪個id的商品資料，請後端去資料庫撈
  const [snowboards, setSnowboards] = useState([]);
  useEffect(async () => {
    let res = await axios.get(
      `${API_URL}/products/productsInfoList/${categoryId}`
    );
    setSnowboards(res.data);
  }, [categoryId]);
  // useEffect(async () => {
  //   let res = await axios.post(`${API_URL}/products/productsInfoList`, {
  //     category: categoryId,
  //   });

  //   setSnowboards(res.data);
  // }, [categoryId]);

  const [flyCart, setFlyCart] = useState(0);

  let orderDate = moment().format("YYYY-MM-DD");
  return (
    <>
      <h3 className="product_title pl-1">{CATEGORY_WORD[categoryId]}</h3>
      <ul className="all_image_s ">
        {snowboards.map((v, i) => {
          return (
            <li key={v.id} className="list-unstyled">
              <div
                className={`product_image_s  ${
                  (snowboards[i].category_id === 3 ||
                    snowboards[i].category_id === 4 ||
                    snowboards[i].category_id === 5 ||
                    snowboards[i].category_id === 6 ||
                    snowboards[i].category_id === 7 ||
                    snowboards[i].category_id === 8) &&
                  "product_image_jackets"
                } `}
              >
                <button
                  id={i + 1}
                  className={`
                  ${collected.map((collections) => {
                    if (
                      (userInfo !== null || userInfo.code !== 1201) &&
                      memberInfo &&
                      collections.member_id === memberInfo[0].id &&
                      collections.product_id === v.id
                      // && 是要全部都是true的時候才會執行，如果有一個不成立(即是false)就不會發生事件
                    ) {
                      return " collect_tagged "; // " "裡前後的空格不可以少，不然和其他被選到收藏的商品className黏在一起就抓不到了
                    }
                  })} 
                   collect_tag `}
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
                  id={v.id}
                  src={`${PRODUCTIMAGE_URL}/${v.image}`}
                  alt=""
                  className={`${flyCart == v.id && "scale-out-tr"}   size `}
                />
              </div>
              <p className="mt-3 h5">{v.name}</p>
              <p className="h5">NT$ {v.price}</p>

              <Button
                id={v.id}
                className="cart"
                onClick={(e) => {
                  let itemId = `p-${v.id}`;
                  let productInfo = e.currentTarget.children[0].value;
                  // console.log("value", productInfo); //http://localhost:3000/assets/images_product/allblack.jfif|雪板類|暗黑滿點單板|1200

                  // 開始把點"加到購物車"的商品存入storage
                  if (storage[itemId]) {
                    alreadyinCart();
                    // alert("您已將此物品加入購物車");
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
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ProductInfo;
