import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ProgressBar from "../components/orders/ProgressBar";
import CartContent from "../components/orders/CartContent";
import OrderContent from "../components/orders/OrderContent";
import Step from "../components/orders/Step";
import { IMAGE_URL } from "../config/url";

const productFromServer = [
  {
    id: 1,
    name: "暗黑滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "此塊雪板由黑曜石製成，黑曜石產量相當稀少，其具有增強技能的力量，站上此塊雪板就能讓它帶著你滑雪，不管多高難度的動作都能輕而易舉完成。",
    image: `${IMAGE_URL}/allblack.jfif`,
    price: 1200,
  },
  {
    id: 2,
    name: "可愛滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "這款雪板相當適合青少年(女)或是童心未泯的諸位，卡通人物elmo在你滑雪時會輕輕播放著歡樂的音樂讓你享受其中!",
    image: `${IMAGE_URL}/Elmo.jfif`,
    price: 1000,
  },
  {
    id: 3,
    name: "力量滿點單板",
    category: "雪板類",
    suitable: "技能班",
    description:
      "浩克的力量不必多說，大家眾所皆知，給正在訓練下坡加速的你前所未有的重力體驗!",
    image: `${IMAGE_URL}/hulk.jfif`,
    price: 1600,
  },
];

function Orders(props) {
  // 先設一個空的商品物件，讓下面可以抓到後重新設定回來
  const [orderProduct, setOrderProduct] = useState({
    id: 0,
    name: "",
    category: "",
    suitable: "",
    description: "",
    image: ``,
    price: 0,
  });

  // 設定一進頁面後便去抓點到的那個商品id，並且判斷如果網址id和點到的id一樣就顯示那樣商品
  useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    // console.log("123", props.location.search);
    const productId = searchParams.get("id");
    // console.log("333", productId);

    const newOrderProduct = productFromServer.find((v, i) => {
      // console.log("555", v.id);
      return v.id === Number(productId);
    });
    if (newOrderProduct) {
      setOrderProduct(newOrderProduct);
    }
  }, []);

  const display = (
    <>
      <p>{orderProduct.name}</p>
    </>
  );

  return (
    <>
      <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar />
      </div>
      {/* <div className="box border border-primary m-5 p-5 h2"> */}

      <CartContent />
      {/* </div> */}
      <OrderContent />
      <div className="box3 d-flex justify-content-end m-5">
        <Step />
      </div>
      {display}
    </>
  );
}

export default withRouter(Orders);
