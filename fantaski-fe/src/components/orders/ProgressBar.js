import { useState, useEffect } from "react";
import { ORDERIMAGE_URL } from "../../config/url";

function ProgressBar({ step, setStep, progressMoving, progressMoving3 }) {
  // 載入中Start----------------------
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const spinner = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
  // 載入中End------------------------
  return (
    <>
      <section>
        <div className="penguin penguin3">
          <img src={`${ORDERIMAGE_URL}/penguin.png`} alt="" />
        </div>

        <section className="d-flex">
          <div>
            <div className="material-icons md-50 md-blue number_icon">
              looks_one
            </div>
            <p className="order_progress_word md-blue">確認訂單</p>
          </div>
          {/* ---------------------------------------------------------- */}

          <div className="progress_line  w3-round-xlarge  ">
            <div className="first_during w3-round-xlarge"></div>
          </div>

          {/* ---------------------------------------------------------- */}
          <div>
            <button
              className="progress_button2"
              onClick={() => {
                setStep(2);
                progressMoving();
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

          <div>
            <button
              className="progress_button3"
              onClick={() => {
                progressMoving3();

                setStep(3);
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