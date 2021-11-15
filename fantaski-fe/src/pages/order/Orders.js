// 內建共用元件
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// 不同階段渲染元件
import FirstStep from "../../components/orders/FirstStep";
import SecondStep from "../../components/orders/SecondStep";
import ThirdStep from "../../components/orders/ThirdStep";

// 頁面通用元件
import ProgressBar from "../../components/orders/ProgressBar";
import PrevStepIcon from "../../components/orders/PrevStepIcon";
import NextStepIcon from "../../components/orders/NextStepIcon";
import OrderSubmitIcon from "../../components/orders/OrderSubmitIcon";
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
  const { setItemNumber, itemNumber } = props;
  const [customerChoose, setCustomerChoose] = useState({
    date: "",
    number: "",
  });
  const [memberPoints, setMemberPoints] = useState();
  useEffect(async () => {
    let res = await axios.get(
      "http://localhost:3001/api/order/getMemberPoints"
    );
    setMemberPoints(res.data);
    console.log(res.data);
  }, []);

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

  // 為了判斷切換為哪個階段
  const [step, setStep] = useState(1);

  // 點選上一步、下一步可以回到頁面最上面
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 和商品頁一樣，如果重新整理進來，購物車數量不會歸零
  let storage = localStorage;
  function handleAddNumber() {
    let itemString = storage["addItemList"];
    let items = itemString.substr(0, itemString.length - 2).split(", ");
    setItemNumber(Number(items.length));
  }
  // 一進到頁面(包括重新整理)，判判斷如果addItemList裡面是空字串，就設購物車數字為0，不然就正常呼叫函式
  useEffect(() => {
    if (storage["addItemList"] === "") {
      setItemNumber(0);
    } else {
      handleAddNumber();
    }
  }, []);

  // ------------------------------------------------------------------------------------
  return (
    <>
      <div className="progress_bar_bg">
        <div className="progress_bar">
          <ProgressBar
            step={step}
            setStep={setStep}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
      {step === 1 && (
        <>
          <FirstStep
            orderProduct={orderProduct}
            step={step}
            setStep={setStep}
            customerChoose={customerChoose}
            setCustomerChoose={setCustomerChoose}
            memberPoints={memberPoints}
            setMemberPoints={setMemberPoints}
          />
          <div className="box3 d-flex justify-content-end m-5">
            <NextStepIcon
              step={step}
              setStep={setStep}
              scrollToTop={scrollToTop}
            />
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <SecondStep
            orderProduct={orderProduct}
            step={step}
            setStep={setStep}
            memberPoints={memberPoints}
            setMemberPoints={setMemberPoints}
          />
          <div className="box3 d-flex justify-content-end m-5">
            <PrevStepIcon
              step={step}
              setStep={setStep}
              scrollToTop={scrollToTop}
            />
            <NextStepIcon
              step={step}
              setStep={setStep}
              scrollToTop={scrollToTop}
            />
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <ThirdStep
            orderProduct={orderProduct}
            step={step}
            setStep={setStep}
          />
          <div className="box3 d-flex justify-content-end m-5">
            <PrevStepIcon
              step={step}
              setStep={setStep}
              scrollToTop={scrollToTop}
            />
            <OrderSubmitIcon />
          </div>
        </>
      )}
    </>
  );
}

export default withRouter(Orders);
