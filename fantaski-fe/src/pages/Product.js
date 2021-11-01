import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

function Product() {
  return (
    <>
      <h2 className="sentence">
        This is the product page.
        <p>I'm tired</p>
      </h2>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block size"
            src="https://3.bp.blogspot.com/-L0I2Milxdtc/W3P87r_qCtI/AAAAAAAAH68/iY0dAZpXlbEmurbprcnTACoFIbFlfQiCQCKgBGAs/s1600/cyan_bg_.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block size"
            src="https://i.pinimg.com/236x/e2/d0/af/e2d0afea804b250800fa2d7cdb8b5e1b.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block size"
            src="https://n.sinaimg.cn/sinakd20200405ac/580/w690h690/20200405/3cfd-irtymmw2235373.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
export default Product;
