import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { addClass } from "dom-helpers";

function PageButton({ setPageButton, pageButton }) {
  function handlePageButton() {
    setPageButton(!pageButton);
  }
  return (
    <>
      <div className="page_button ">
        <div>
          <FontAwesomeIcon className="arrow_go" icon={faCaretLeft} />
        </div>
        <ul>
          <li
            className={`${pageButton ? "page_active" : ""}`}
            onClick={handlePageButton}
          >
            1
          </li>
          <li
            className={`${pageButton ? "page_active" : ""}`}
            onClick={handlePageButton}
          >
            2
          </li>
        </ul>
        <div>
          <FontAwesomeIcon className="arrow_go" icon={faCaretRight} />
        </div>
      </div>
    </>
  );
}
export default PageButton;
