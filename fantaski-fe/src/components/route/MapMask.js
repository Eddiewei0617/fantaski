import React from "react";
import { IMAGE_ROUTER_URL } from "../../config/url";
// 地圖遮罩

function MapMask() {
  return (
    <div>
      {/* <div className="modal" tabindex="-1"> */}
      <div className="maskBackground" tabindex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header ">
              <div className="modal-title greenLine">毛線</div>

              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            {/* 視窗內部內容 */}
            <div className="modal-body d-flex row">
              <div className="col-6 d-flex row">
                <div className="imageBoxTop col-12 text-center mb-3">
                  {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                  <img
                    className="shadow-sm bg-white rounded"
                    src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                  />
                </div>
                <div className="col-6 imageBoxLeft">
                  <img
                    className="shadow-sm bg-white rounded"
                    src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                  ></img>
                </div>
                <div className="col-6 imageBoxRight">
                  <img
                    className="shadow-sm bg-white rounded"
                    src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                  ></img>
                </div>
              </div>
              <div className="col-6 ">
                <div className="row imageBoxText">
                  <div className="col-6 text-right">
                    <h6>狀況 :</h6>
                    <h6>推薦課程 :</h6>
                    <h6>推薦裝備 :</h6>
                    <h6>教練 :</h6>
                    <h6>課程人數 :</h6>
                  </div>
                  <div className="col-6">
                    <h6>開放</h6>
                    <h6>滑雪初體驗</h6>
                    <h6>雙版/護目鏡/護臂</h6>
                    <h6>Jessica</h6>
                    <h6>10位</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button type="button" className="popBtn ">
                立即報名
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapMask;
