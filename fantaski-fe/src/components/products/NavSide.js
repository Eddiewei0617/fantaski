import { Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import { GiSnowboard } from "react-icons/gi";
import { GrCoatCheck } from "react-icons/gr";
import { GiProtectionGlasses } from "react-icons/gi";
import { GiDeer } from "react-icons/gi";

// import React, { useState, useCallback } from "react";
// import { Card, ListGroup } from "react-bootstrap";
// import { Collapse } from "react-collapse";

function NavSide() {
  return (
    <>
      {/* 側邊欄區域 */}
      {/* <div className="container-fluid">
        <div className="row ">
          <div className="col-3"> */}
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

        {/* <Card>
          <Card.Header className="product_area">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="3"
              className="product_word"
            >
              <GiDeer className="mr-2" />
              器材類
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body className="detail_word">
              <GiDeer className="mr-1" />
              聖誕老人
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="3">
            <Card.Body className="detail_word">
              <GiDeer className="mr-1" />
              雪地摩托車
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="3">
            <Card.Body className="detail_word">
              <GiDeer className="mr-1" />
              鹿與雪橇車
            </Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>

      {/* 為了隔開與商品圖們的距離 */}
      <div className="col-1"></div>
    </>
  );
}
export default NavSide;

// Navbar下拉式選單reacr-bootstrap---------------------------
//   const accessibilityIds = {
//     // checkbox: "accessible-marker-example1",
//     button: "accessible-marker-example2",
//   };
//   const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);
//   const onClick = useCallback(
//     () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
//     [isButtonCollapseOpen]
//   );
//   const [isCheckboxCollapseOpen, setIsCheckboxCollapseOpen] = useState(false);
//   const onChange = useCallback(
//     ({ target: { checked } }) => setIsCheckboxCollapseOpen(checked),
//     [setIsCheckboxCollapseOpen]
//   );
// -----------------------------------------------------------
{
  /* <div className="accordion" id="accordionExample">
    <Card style={{ width: "13rem" }} className="side_bar">
      <Card.Header>租點裝備</Card.Header>
      <ListGroup variant="flush">
        <Card>
          <Button
            className="btn btn-link btn-light text-left"
            type="button"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded={isButtonCollapseOpen}
            aria-controls={accessibilityIds.button}
            onClick={onClick}
          >
            <ListGroup.Item className="product_word">雪板類</ListGroup.Item>
          </Button>
          <Collapse
            isOpened={isButtonCollapseOpen}
            className="collapse-css-transition"
          >
            <ListGroup.Item className="detail_word">單板</ListGroup.Item>
            <ListGroup.Item className="detail_word">雙板</ListGroup.Item>
            <div id={accessibilityIds.button} className="blob" />
          </Collapse>
        </Card>
  
        <Card>
          <Button
            className="btn btn-link btn-light text-left"
            type="button"
            aria-expanded={isButtonCollapseOpen}
            aria-controls={accessibilityIds.button}
            onClick={onClick}
          >
            <ListGroup.Item className="product_word">男女裝</ListGroup.Item>
          </Button>
          <Collapse isOpened={isButtonCollapseOpen}>
            <ListGroup.Item className="detail_word">
              連帽外套
            </ListGroup.Item>
            <ListGroup.Item className="detail_word">雪鞋</ListGroup.Item>
            <ListGroup.Item className="detail_word">毛帽</ListGroup.Item>
            <ListGroup.Item className="detail_word">雪褲</ListGroup.Item>
            <div id={accessibilityIds.button} className="blob" />
          </Collapse>
        </Card>
        <Card>
          <Button
            className="btn btn-link btn-light text-left"
            type="button"
            aria-expanded={isButtonCollapseOpen}
            aria-controls={accessibilityIds.button}
            onClick={onClick}
          >
            <ListGroup.Item className="product_word">配件類</ListGroup.Item>
          </Button>
          <Collapse isOpened={isButtonCollapseOpen}>
            <ListGroup.Item className="detail_word">護目鏡</ListGroup.Item>
            <ListGroup.Item className="detail_word">雪杖</ListGroup.Item>
            <ListGroup.Item className="detail_word">護臀</ListGroup.Item>
            <ListGroup.Item className="detail_word">護膝</ListGroup.Item>
            <div id={accessibilityIds.button} className="blob" />
          </Collapse>
        </Card>
        <Card>
          <Button
            className="btn btn-link btn-light text-left"
            type="button"
            aria-expanded={isButtonCollapseOpen}
            aria-controls={accessibilityIds.button}
            onClick={onClick}
          >
            <ListGroup.Item className="product_word">器材類</ListGroup.Item>
          </Button>
          <Collapse isOpened={isButtonCollapseOpen}>
            <ListGroup.Item className="detail_word">
              聖誕老人
            </ListGroup.Item>
            <ListGroup.Item className="detail_word">
              雪地摩托車
            </ListGroup.Item>
            <ListGroup.Item className="detail_word">
              鹿與雪橇車
            </ListGroup.Item>
            <div id={accessibilityIds.button} className="blob" />
          </Collapse>
        </Card>
      </ListGroup>
    </Card>
  </div> */
}
