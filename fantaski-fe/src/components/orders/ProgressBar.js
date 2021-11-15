import { useState, useEffect } from "react";
import { ORDERIMAGE_URL } from "../../config/url";

function ProgressBar({ step, setStep, scrollToTop }) {
  // console.log("第一滑", progressMoving);
  // 載入中Start----------------------
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // 載入中End------------------------

  // 當step有更動時，呼叫不同進度條動畫函式
  useEffect(() => {
    // step === 1 && progressMovingBack();
    step === 2 && progressMoving();
    step === 3 && progressMoving3();
  }, [step]);

  // classList.add 是在原本的樣式加上新的樣式；style.className是覆蓋原本樣式
  // 企鵝和進度條1階段到2階段移動
  let penguin = document.querySelector(".penguin");
  let progressLine = document.querySelector(".first_during");
  let number2 = document.querySelector(".progress_button2 div");
  let word2 = document.querySelector(".progress_button2 p");
  // 購物車到信用卡輸入的過程(去)
  function progressMoving() {
    penguin.classList.add("penguinMove");
    // penguin.style.removeProperty("transform");
    progressLine.classList.add("first_during_move");
    progressLine.classList.remove("first_during_move_back");
    number2.style.color = "#134865";
    word2.style.color = "#134865";
  }
  // 從信用卡回購物車(回)
  function progressMovingBack() {
    penguin.classList.remove("penguinMove");
    // penguin.style.transform = "scaleX(-1) translateX(0px)";
    progressLine.classList.remove("first_during_move");
    progressLine.classList.add("first_during_move_back");
    number2.style.removeProperty("color");
    word2.style.removeProperty("color");
  }

  // 企鵝和進度條2階段到3階段(去)
  let penguin3 = document.querySelector(".penguin3");
  let progressLine3 = document.querySelector(".first_during3");
  let number3 = document.querySelector(".progress_button3 div");
  let word3 = document.querySelector(".progress_button3 p");
  function progressMoving3() {
    penguin3.classList.add("penguinMove3");
    progressLine3.classList.add("first_during_move");
    progressLine3.classList.remove("first_during3_move_back");
    number3.style.color = "#134865";
    word3.style.color = "#134865";
  }
  // 從第3階段回第2階段(回)
  function progressMovingBack3() {
    penguin3.classList.remove("penguinMove3");
    progressLine3.classList.remove("first_during_move");
    // progressLine3.classList.add("first_during3_move_back");
    number3.style.removeProperty("color");
    word3.style.removeProperty("color");
  }

  // ----------------------------------------------------------------------------------------
  return (
    <>
      <section>
        <div className="penguin penguin3">
          <img src={`${ORDERIMAGE_URL}/penguin.png`} alt="" />
        </div>

        <section className="d-flex">
          {/* 階段一進度 */}
          <div>
            <button
              className="progress_button1"
              onClick={() => {
                setStep(1);
                progressMovingBack();
                scrollToTop();
              }}
            >
              <div className="material-icons md-50 md-blue number_icon">
                looks_one
              </div>
              <p className="order_progress_word md-blue">確認訂單</p>
            </button>
          </div>
          {/* ---------------------------------------------------------- */}

          <div className="progress_line  w3-round-xlarge  ">
            <div className="first_during w3-round-xlarge"></div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* 階段二進度 */}
          <div>
            <button
              className="progress_button2"
              onClick={() => {
                setStep(2);
                progressMoving();
                progressMovingBack3();
                scrollToTop();
              }}
            >
              <div className="material-icons md-50 md-grey number_icon">
                looks_two
              </div>
              <p className="order_progress_word md-grey">付款方式</p>
            </button>
          </div>
          {/* ---------------------------------------------------------- */}
          <div className="progress_line3  w3-round-xlarge  ">
            <div className="first_during3 w3-round-xlarge"></div>
          </div>
          {/* ---------------------------------------------------------- */}
          {/* 階段三進度 */}
          <div>
            <button
              className="progress_button3"
              onClick={() => {
                setStep(3);
                progressMoving3();
                scrollToTop();
              }}
            >
              <div className="material-icons md-50 md-grey number_icon">
                looks_3
              </div>
              <p className="order_progress_word md-grey">完成訂單</p>
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export default ProgressBar;
