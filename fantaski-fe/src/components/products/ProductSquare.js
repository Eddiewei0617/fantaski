import { useState, useEffect } from "react";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsTagsFill } from "react-icons/bs";
import PageButton from "../products/PageButton";
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

function ProductSquare({ clickToChangeToggle, setToggleState, toggleState }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productFromServer);
  }, []);

  const display = (
    <ul className="all_image_s ">
      {products.map((v, i) => {
        return (
          <li key={v.id} className="list-unstyled ">
            <div className="product_image_s  ">
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
            <p className="mt-3 h5">{v.name}</p>
            <p className="h5">NT$ {v.price}</p>
            <Link to={"/orders?id=" + v.id}>
              <Button className="cart">加入購物車</Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const [pageButton, setPageButton] = useState(false);

  return (
    <>
      <div>
        <h3 className="product_title pl-1">雪板類</h3>
        {display}
        <PageButton setPageButton={setPageButton} pageButton={pageButton} />
      </div>
    </>
  );
}

export default ProductSquare;
