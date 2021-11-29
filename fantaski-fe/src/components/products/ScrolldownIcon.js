import { ImPointDown } from "react-icons/im";
import { Button } from "react-bootstrap";

function ScrolldownIcon({ onClick }) {
  return (
    <>
      <Button
        variant="light"
        className="scrolldown animate__animated animate__bounce animate__repeat-2	2	"
        onClick={onClick}
      >
        <ImPointDown size="2rem" className="down_hand" />
      </Button>
    </>
  );
}

export default ScrolldownIcon;
