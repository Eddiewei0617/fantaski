import React from "react";

function ProductCard(props) {
  const { product, i, selectedAdvice } = props;
  return (
    <>
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
            src={`/assets/img_course/${product.img}`}
            alt=""
          ></img>
        </div>
        <div className="advice-product-intro p-1 d-flex flex-column justify-content-between">
          <h6 className="text-center">{product.name}</h6>
          <p className={`${selectedAdvice === i ? "p-selected" : "p-normal"} `}>
            {product.intro}
          </p>
          <h5
            className={`${
              selectedAdvice === i ? "p-selected" : "p-normal"
            } price`}
          >
            {product.price}
          </h5>
          <div className="d-flex justify-content-between">
            <button
              className={`${
                selectedAdvice === i ? "button-selected" : "button-normal"
              } `}
            >
              立即購買
            </button>
            <button
              className={`${
                selectedAdvice === i ? "button-selected" : "button-normal"
              } `}
            >
              立即購買
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
