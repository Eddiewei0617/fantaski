import { BiBorderAll } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { Button } from "react-bootstrap";

function SwitchIcon() {
  return (
    <>
      <div className="switch_icon">
        <Button variant="dark">
          <BiBorderAll />
        </Button>
        <Button variant="dark">
          <FaListUl />
        </Button>
      </div>
    </>
  );
}

export default SwitchIcon;
