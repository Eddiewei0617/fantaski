import { BiBorderAll } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductSquare from "./ProductSquare";

function SwitchIcon() {
  return (
    <>
      <div className="switch_icon">
        <Button
          variant="dark"
          className="mr-1"
          onClick={() => {
            return (
              <div>
                <Link to="/products" component={ProductSquare}></Link>;
              </div>
            );
          }}
        >
          <BiBorderAll size="1.5rem" />
        </Button>
        <Button variant="dark">
          <FaListUl size="1.5rem" />
        </Button>
      </div>
    </>
  );
}

export default SwitchIcon;
