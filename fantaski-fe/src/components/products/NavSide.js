import { Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import { GiSnowboard } from "react-icons/gi";
import { GrCoatCheck } from "react-icons/gr";
import { GiProtectionGlasses } from "react-icons/gi";
import { GiDeer } from "react-icons/gi";

function NavSide() {
  return (
    <>
      {/* 側邊欄區域 */}

      <span className="separate"></span>
      <Accordion className="side_bar">
        <Card>
          <Card.Header>租點裝備</Card.Header>
        </Card>
        <Card>
          <Card.Header className="product_area">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="product_word"
            >
              <GiSnowboard className="mr-2" />
              雪板類
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="detail_word">
              <GiSnowboard className="mr-1" />
              單板
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="detail_word">
              <GiSnowboard className="mr-1" />
              雙板
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* 服飾類 */}

        <Card>
          <Card.Header className="product_area">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="1"
              className="product_word"
            >
              <GrCoatCheck className="mr-2" />
              服飾類
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="detail_word">
              <GrCoatCheck className="mr-1" />
              滑雪外套
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="detail_word">
              <GrCoatCheck className="mr-1" />
              雪鞋
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="detail_word">
              <GrCoatCheck className="mr-1" />
              毛帽
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="detail_word">
              <GrCoatCheck className="mr-1" />
              雪褲
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* 配件類 */}

        <Card>
          <Card.Header className="product_area">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="2"
              className="product_word"
            >
              <GiProtectionGlasses className="mr-2" />
              裝備類
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body className="detail_word">
              <GiProtectionGlasses className="mr-1" />
              滑雪配件
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="2">
            <Card.Body className="detail_word">
              <GiProtectionGlasses className="mr-1" />
              器材出租
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* 器材類 */}
      </Accordion>

      {/* 為了隔開與商品圖們的距離 */}
      <div className="col-1"></div>
    </>
  );
}
export default NavSide;
