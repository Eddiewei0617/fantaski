import { useState, useEffect } from "react";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { BsTagsFill } from "react-icons/bs";
import PageButton from "./PageButton";

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
];

function ProductList({ clickToChangeToggle, setToggleState, toggleState }) {
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

              <Link to={"/orders?id=" + v.id}>
                <Button className="cart">加入購物車</Button>
              </Link>
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
    // console.log("e.target", pageId);
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
        />
      </div>
    </>
  );
}

export default withRouter(ProductList);
