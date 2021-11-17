// 內建共用元件
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// 不同階段渲染元件
import FirstStep from "../../components/orders/FirstStep";
import SecondStep from "../../components/orders/SecondStep";
import ThirdStep from "../../components/orders/ThirdStep";
import OrderContent from "../../components/orders/OrderContent";

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
  // 為了購物車第一步驟改變日期和數量而設的
  const [customerChoose, setCustomerChoose] = useState({
    date: "",
    number: "",
  });

  // 從資料庫抓member的資料回來
  const [memberPoints, setMemberPoints] = useState(null);
  useEffect(async () => {
    let res = await axios.get(
      "http://localhost:3001/api/order/getMemberPoints"
    );
    setMemberPoints(res.data);
    console.log(res.data);
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

  const [pointUsed, setPointUsed] = useState(0);

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
            step={step}
            setStep={setStep}
            customerChoose={customerChoose}
            setCustomerChoose={setCustomerChoose}
            memberPoints={memberPoints}
            setMemberPoints={setMemberPoints}
            pointUsed={pointUsed}
            setPointUsed={setPointUsed}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
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
            step={step}
            setStep={setStep}
            memberPoints={memberPoints}
            setMemberPoints={setMemberPoints}
            pointUsed={pointUsed}
            setPointUsed={setPointUsed}
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
            step={step}
            setStep={setStep}
            memberPoints={memberPoints}
            pointUsed={pointUsed}
            setPointUsed={setPointUsed}
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
