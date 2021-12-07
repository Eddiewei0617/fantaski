import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COURSE_IMG_URL, PRODUCTIMAGE_URL } from "../../../config/url";
import { handleAddNumber } from "../moduleList";

function ProductCard(props) {
  const {
    product,
    i,
    selectedAdvice,
    customerChoose,
    setItemNumber,
    cartPositionState,
    setColorButton,
    setCategoryId,
  } = props;
  const [ifAddCart, setIfAddCart] = useState(false);
  const FlyToCart = useRef();

  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
  }
  useEffect(() => {
    if (product !== null && storage[`p-${product.id}`]) {
      setIfAddCart(true);
    }
  }, [product]);

  // function handleFlyToCart(e) {
  //   FlyToCart.current.style.top = `${
  //     e.clientY - FlyToCart.current.clientHeight / 2
  //   }px`;
  //   FlyToCart.current.style.left = `${
  //     e.clientX - FlyToCart.current.clientWidth / 2
  //   }px`;
  //   let cartX =
  //     cartPositionState.current.offsetLeft +
  //     cartPositionState.current.clientWidth / 2;
  //   let cartY =
  //     cartPositionState.current.offsetTop +
  //     cartPositionState.current.clientHeight / 2;
  //   setTimeout(() => {
  //     FlyToCart.current.style.top = `${cartY}px`;
  //     FlyToCart.current.style.left = `${cartX}px`;
  //     FlyToCart.current.style.width = "10px";
  //     FlyToCart.current.style.height = "10px";
  //     FlyToCart.current.style.opacity = "0";
  //   }, 0);
  // }

  return (
    <>
      {/* <div className="fly-to-cart" ref={FlyToCart}></div> */}
      <div
        className={`${
          selectedAdvice === i
            ? "advice-product-box-selected"
            : "advice-product-box"
        } d-flex justify-content-center align-items-center`}
      >
        <div
          className={`${
            selectedAdvice === i ? "img-box-selected" : "img-box"
          } mx-2`}
        >
          <img
            className="object-fit"
            src={`${PRODUCTIMAGE_URL}/${product.image}`}
            alt=""
          ></img>
        </div>
        <div className="advice-product-intro p-1 d-flex flex-column justify-content-between">
          <div className="text-center course-product-title">{product.name}</div>
          <p className={`${selectedAdvice === i ? "p-selected" : "p-normal"} `}>
            {product.content}
          </p>
          <h5
            className={`${
              selectedAdvice === i ? "p-selected" : "p-normal"
            } price`}
          >
            $ {product.price}
          </h5>
          <div className="buttons d-flex justify-content-between">
            <button
              className={`addCartBtn ${ifAddCart && "button-clicked"} ${
                selectedAdvice === i ? "button-selected" : "button-normal"
              } `}
              onClick={(e) => {
                setIfAddCart(true);
                let itemId = `p-${product.id}`;
                let productInfo = e.currentTarget.children[0].value;
                // console.log("value", productInfo); //http://localhost:3000/assets/images_product/allblack.jfif|雪板類|暗黑滿點單板|1200

                // 開始把點"加到購物車"的商品存入storage
                if (storage[itemId]) {
                  alert("您已將此物品加入購物車");
                } else {
                  // handleFlyToCart(e);
                  storage.setItem(itemId, productInfo);
                  storage["addItemList"] += `${itemId}, `;
                  handleAddNumber(storage, setItemNumber);
                }
              }}
            >
              {ifAddCart ? "已加入" : "立即購買"}
              <input
                type="hidden"
                value={`${PRODUCTIMAGE_URL}/${product.image}|B|${product.name}|${product.price}|${customerChoose.date}|${customerChoose.number}`}
              />
            </button>
            <Link
              to="/products"
              onClick={() => {
                setColorButton("租點裝備");
                setCategoryId(product.category_id);
              }}
            >
              <button
                className={`moreBtn ${
                  selectedAdvice === i ? "button-selected" : "button-normal"
                } `}
              >
                更多款式
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
