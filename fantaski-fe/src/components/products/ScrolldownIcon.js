import { ImPointDown } from "react-icons/im";
import { Button } from "react-bootstrap";

function ScrolldownIcon() {
  return (
    <>
      <Button
        variant="light"
        className="scrolldown animate__animated animate__bounce"
      >
        <ImPointDown size="2rem" />
      </Button>
    </>
  );
}

export default ScrolldownIcon;
