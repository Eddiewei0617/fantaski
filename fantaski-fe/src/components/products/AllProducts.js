import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../config/url";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { BsTagsFill } from "react-icons/bs";
import { CATEGORY_WORD } from "../../config/StatusShortcut";

function AllProducts({
  collected,
  handleCollect,
  handleChecked,
  handleAddNumber,
  setAllState,
  allState,
  clickToChangeToggle,
  toggleState,
  setItemNumber,
  categoryId,
  memberInfo,

  setCollectUpdate,
  cartPositionState,
}) {
  let storage = localStorage;
  const [allProducts, setallProducts] = useState([]);
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/products/allproducts`);
    setallProducts(res.data);
  }, [allState]);
  const getAll = (
    <>
      <h3 className="product_title pl-1">{CATEGORY_WORD[categoryId]}</h3>
      <ul className="all_image_s ">
        {allProducts.map((v, i) => {
          return (
            <li key={v.id} className="list-unstyled">
              <div className="product_image_s">
                <button
                  id={i + 1}
                  className={
                    `
              ${collected.map((collections) => {
                if (
                  collections.member_id === 1 &&
                  collections.product_id === v.id
                ) {
                  return " collect_tagged "; // " "裡前後的空格不可以少，不然和其他被選到收藏的商品className黏在一起就抓不到了
                }
              })}
               collect_tag `
                    //  ${
                    //   toggleState[i + 1] === true
                    //     ? "collect_tagged"
                    //     : "collect_tag"
                    // }
                  }
                  onClick={(e) => {
                    //clickToChangeToggle(e);
                    handleCollect(v);
                    e.currentTarget.className.includes("collect_tagged")
                      ? handleCollect(v)
                      : handleChecked();
                  }}
                >
                  <BsTagsFill title="加入收藏" />
                </button>
                <img
                  id={v.id}
                  src={`${PRODUCTIMAGE_URL}/${v.image}`}
                  alt=""
                  className="size fly_cart"
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

  return <>{getAll}</>;
}
export default AllProducts;
