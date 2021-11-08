import { Carousel } from "react-bootstrap";
import { PRODUCTIMAGE_URL } from "../../config/url";

function CarouselP() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <div className="image_range">
            <img
              className="d-block size"
              src={`${PRODUCTIMAGE_URL}/test.png`}
              alt="First slide"
            />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image_range">
            <img
              className="d-block size"
              src={`${PRODUCTIMAGE_URL}/santa1.jpg`}
              alt="Second slide"
            />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image_range">
            <img
              className="d-block size"
              src={`${PRODUCTIMAGE_URL}/snowboarding-test.jpg`}
              alt="Third slide"
            />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 純bootstrap版 */}
      {/* <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          <div className="carousel-item active image_range">
            <img
              src={`http://localhost:3000/assets/images/products-introduction-1.jpg`}
              className="d-block size"
              alt="..."
            />
          </div>
          <div className="carousel-item image_range">
            <img
              src={`http://localhost:3000/assets/images/瑪麗蓮夢露.jfif`}
              className="d-block size"
              alt="..."
            />
          </div>
          <div className="carousel-item image_range">
            <img
              src={`http://localhost:3000/assets/images/夕陽山.png`}
              className="d-block size"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
    </>
  );
}

export default CarouselP;
