import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import ProgressBar from "../../components/orders/ProgressBar";
import FirstStep from "../../components/orders/FirstStep";
import SecondStep from "../../components/orders/SecondStep";
import ThirdStep from "../../components/orders/ThirdStep";

import { PRODUCTIMAGE_URL, ORDERIMAGE_URL } from "../../config/url";

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

  // 為了判斷在哪個頁面切換
  const [step, setStep] = useState(0);

  switch (step) {
    case 1:
      console.log("第一頁");
      <FirstStep
        orderProduct={orderProduct}
        progressMoving={progressMoving}
        step={step}
        setStep={setStep}
      />;
      break;
    case 2:
      console.log("第二頁");
      return (
        <>
          <div className="navbar"></div>
          <div className="progress_bar_bg">
            <div className="progress_bar">
              <ProgressBar
                step={step}
                setStep={setStep}
                progressMoving={progressMoving}
                progressMoving3={progressMoving3}
              />
            </div>
          </div>
          <SecondStep
            orderProduct={orderProduct}
            progressMoving={progressMoving}
            progressMoving3={progressMoving3}
            step={step}
            setStep={setStep}
          />
        </>
      );
      break;
    case 3:
      console.log("第三頁");
      return (
        <>
          <div className="navbar"></div>
          <div className="progress_bar_bg">
            <div className="progress_bar">
              <ProgressBar
                step={step}
                setStep={setStep}
                progressMoving={progressMoving}
                progressMoving3={progressMoving3}
              />
            </div>
          </div>
          <ThirdStep />
        </>
      );
      break;
    default:
      console.log("請再次確認頁面");
      break;
  }

  // 企鵝和進度條移動
  let penguin = document.querySelector(".penguin");
  let penguin3 = document.querySelector(".penguin3");
  let progressLine = document.querySelector(".first_during");
  let progressLine3 = document.querySelector(".first_during3");
  let number2 = document.querySelector(".progress_button2 div");
  let word2 = document.querySelector(".progress_button2 p");
  let number3 = document.querySelector(".progress_button3 div");
  let word3 = document.querySelector(".progress_button3 p");
  // 購物車到信用卡輸入的過程
  function progressMoving() {
    penguin.classList.add("penguinMove");
    progressLine.classList.add("first_during_move");
    number2.style.color = "#134865";
    word2.style.color = "#134865";
    // console.log("888");
  }
  // 輸入卡號後到確認訂單的過程
  function progressMoving3() {
    penguin3.classList.add("penguinMove3");
    progressLine3.classList.add("first_during_move");
    number3.style.color = "#134865";
    word3.style.color = "#134865";
  }
  // classList.add 是在原本的樣式加上新的樣式；style.className是覆蓋原本樣式

  return (
    <>
      <div className="navbar"></div>
      <div className="progress_bar_bg">
        <div className="progress_bar">
          <ProgressBar
            step={step}
            setStep={setStep}
            progressMoving={progressMoving}
            progressMoving3={progressMoving3}
          />
        </div>
      </div>
      <FirstStep
        orderProduct={orderProduct}
        progressMoving={progressMoving}
        step={step}
        setStep={setStep}
      />

      {/* <SecondStep orderProduct={orderProduct} progressMoving={progressMoving} /> */}
      <ThirdStep />
    </>
  );
}

export default withRouter(Orders);
