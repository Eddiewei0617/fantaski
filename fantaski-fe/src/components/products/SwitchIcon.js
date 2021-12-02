import { useRef, useEffect } from "react";

import { BiBorderAll } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { Button } from "react-bootstrap";

function SwitchIcon({ setSquare, square }) {
  // 用useRef來獲取目標的屬性(ex. id、樣式、...)
  const squareId = useRef();
  const listId = useRef();

  // 讓一進來頁面就先渲染方格button的預設顏色
  useEffect(() => {
    squareId.current.style.backgroundColor = "#ec6855";
  }, []);

  return (
    <>
      <div className="switch_icon">
        <Button
          variant="dark"
          className="mr-1 square"
          ref={squareId}
          onClick={() => {
            squareId.current.style.backgroundColor = "#ec6855";
            listId.current.style.backgroundColor = "";
            setSquare(true);
          }}
        >
          <BiBorderAll size="1.6rem" />
        </Button>
        <Button
          variant="dark"
          ref={listId}
          onClick={() => {
            squareId.current.style.backgroundColor = "";
            listId.current.style.backgroundColor = "#ec6855";
            setSquare(false);
          }}
        >
          <FaListUl size="1.6rem" />
        </Button>
      </div>
    </>
  );
}

export default SwitchIcon;
