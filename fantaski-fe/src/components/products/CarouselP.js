import { Carousel } from "react-bootstrap";
import { PRODUCTIMAGE_URL } from "../../config/url";

function CarouselP() {
  return (
    <>
      <Carousel className="carousel">
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
              src={`${PRODUCTIMAGE_URL}/skifamily.png`}
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
    </>
  );
}

export default CarouselP;
