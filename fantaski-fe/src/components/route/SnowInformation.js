import React from "react";

function SnowInformation() {
  return (
    <div>
      <div>
        <h1 className="informationText">雪場資訊</h1>
      </div>
      <div className="informationRealtive">
        <div className="information">
          <img src="assets/snow3.jpg"></img>
        </div>
        <div className="altitude">
          <p>海拔</p>
          <p> 地區域海拔 : 1670m</p>
          <p> 最高抬升點 : 1860m</p>
          <p> 垂直高度 : 600m</p>
          <p>
            年平均降雪量:290萬 - Maln、Captain's、Arcadla盆地所下的自然雪 :
            1670m
          </p>
          <p> 地形 : 400公頃</p>
        </div>
      </div>
    </div>
  );
}

export default SnowInformation;
