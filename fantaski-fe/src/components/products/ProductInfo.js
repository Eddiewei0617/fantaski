import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BsTagsFill } from "react-icons/bs";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { CATEGORY_WORD } from "../../config/StatusShortcut";
import { API_URL } from "../../config/url";

function ProductInfo({
  toggleState,
  clickToChangeToggle,
  handleAddNumber,
  categoryId,
}) {
  let storage = localStorage;

  // 傳參數(categoryId)給後端(記得用Post!!!)，跟後端說要哪個id的商品資料，請後端去資料庫撈
  const [snowboards, setSnowboards] = useState([]);
  useEffect(async () => {
    let res = await axios.post(`${API_URL}/products/productsInfoList`, {
      category: categoryId,
    });
    setSnowboards(res.data);
  }, [categoryId]);

  return (
    <>
      <h3 className="product_title pl-1">{CATEGORY_WORD[categoryId]}</h3>
      <ul className="all_image_s ">
        {snowboards.map((v, i) => {
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
                <img
                  src={`${PRODUCTIMAGE_URL}/${v.image}`}
                  alt=""
                  className="size"
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
                  value={`${PRODUCTIMAGE_URL}/${v.image}|B|${v.name}|${v.price}|2021-11-15|1`}
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
