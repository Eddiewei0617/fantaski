import { IMAGE_URL } from "../../config/url";

function ProgressBar() {
  return (
    <>
      <section>
        <div className="penguin">
          <img src={`${IMAGE_URL}/penguin.png`} alt="" />
        </div>

        <section className="d-flex">
          <div>
            <div className="material-icons md-50 md-blue number_icon">
              looks_one
            </div>
            <p className="order_progress_word md-blue">確認訂單</p>
          </div>
          <div className="progress_line "> </div>
          <div>
            <div className="material-icons md-50 md-grey number_icon">
              looks_two
            </div>
            <p className="order_progress_word md-grey">付款方式</p>
          </div>
          <div className="progress_line"> </div>
          <div>
            <div className="material-icons md-50 md-grey number_icon">
              looks_3
            </div>
            <p className="order_progress_word md-grey">完成訂單</p>
          </div>
        </section>
      </section>
    </>
  );
}

export default ProgressBar;
