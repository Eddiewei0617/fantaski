import React from "react";

function Place() {
  return (
    <div>
      <section class="informationSection informationText">
        <p className="font-weight-bold ">雪場資訊</p>
      </section>

      <div class="pimg1">
        <section class="informationSection section-dark">
          <h2>海拔</h2>
          <p>
            地區域海拔 : 1670m
            <br />
            最高抬升點 : 1860m <br />
            垂直高度 : 600m <br />
            年平均降雪量:290萬 <br />
            Maln、Captain's、Arcadla盆地所下的自然雪 : 1670m <br />
            地形 : 400公頃
          </p>
        </section>
      </div>
      {/* <section class="informationSection2 "></section> */}
      <div class="pimg2">
        <section class="informationSection section-dark">
          <h2>營業時間 :</h2>
          <p>
            {/* 開放時間 <br /> */}
            星期一~星期五 : 上午八點半到下午四點 <br />
            星期六~星期日 : 上午八點半到下午六點 <br />
          </p>
        </section>
      </div>
    </div>
  );
}

export default Place;
