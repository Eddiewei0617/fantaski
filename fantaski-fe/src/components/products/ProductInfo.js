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
  memberInfo,
  collected,
  setCollectUpdate,
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

  // 傳點到想收藏的資料給後端  // 註: 給一個v變數是因為丟到下面map迴圈裡也需要用到v，所以先在這邊加
  // 因為傳給後端後同時有刪除也有insert，所以要一個判斷是判斷我點的這個商品是不是已經在product_collection裡面出現過了
  async function handleCollect(v) {
    let isDelete = false;
    collected.forEach((item, index) => {
      if (v.id === item.product_id) {
        isDelete = true;
      }
    });
    setCollectUpdate(Math.random());
    try {
      let res = await axios.post(`${API_URL}/products/collection`, {
        isDelete: isDelete,
        memberId: memberInfo[0].id,
        productId: v.id,
      });
    } catch (err) {
      console.error("handleCollect", err);
    }
  }

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
                }`}
              >
                <button
                  id={i + 1}
                  className={`${
                    toggleState[i + 1] === true
                      ? "collect_tagged"
                      : "collect_tag"
                  } 
                  
                  ${collected.map((collections) => {
                    if (
                      collections.member_id === 1 &&
                      collections.product_id === v.id
                    ) {
                      return " collect_tagged ";
                    }
                  })} 
                  
                  collect_tag`}
                  onClick={(e) => {
                    clickToChangeToggle(e);
                    handleCollect(v);
                  }}
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
