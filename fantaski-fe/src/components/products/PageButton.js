import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function PageButton() {
  return (
    <>
      <div className="page_button">
        <div>
          <FontAwesomeIcon className="arrow_go" icon={faCaretLeft} />
        </div>
        <ul className="">
          <li>1</li>
          <li>2</li>
        </ul>
        <div>
          <FontAwesomeIcon className="arrow_go" icon={faCaretRight} />
        </div>
      </div>
    </>
  );
}
export default PageButton;
