import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { addClass } from "dom-helpers";

function PageButton({ setPageButton, pageButton, handlePageButton, products }) {
  // console.log("抓", products);
  const pageNumber = [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
    {
      id: 3,
      name: "3",
    },
    {
      id: 4,
      name: "4",
    },
  ];
  useEffect(() => {
    setPageButton(1);
  }, []);

  return (
    <>
      <div className="page_button ">
        <div
          onClick={() => {
            if (pageButton > 1) {
              setPageButton(pageButton - 1);
            }
          }}
        >
          <FontAwesomeIcon className="arrow_go" icon={faCaretLeft} />
        </div>
        <ul>
          {pageNumber.map((v, i) => {
            return (
              <li
                key={v.id}
                id={v.id}
                className={`${pageButton === v.id ? "page_active" : ""} `}
                onClick={handlePageButton}
              >
                {v.name}
              </li>
            );
          })}
        </ul>

        {/* <ul>
          <li
            id="1"
            className={`${pageButton === 1 ? "page_active" : ""} `}
            onClick={handlePageButton}
          >
            1
          </li>
          <li
            id="2"
            className={`${pageButton === 2 ? "page_active" : ""} `}
            onClick={handlePageButton}
          >
            2
          </li>
          <li
            id="3"
            className={`${pageButton === 3 ? "page_active" : ""} `}
            onClick={handlePageButton}
          >
            3
          </li>
        </ul> */}
        <div
          onClick={() => {
            if (pageButton < pageNumber.length) {
              setPageButton(pageButton + 1);
            }
          }}
        >
          <FontAwesomeIcon className="arrow_go" icon={faCaretRight} />
        </div>
      </div>
    </>
  );
}
export default PageButton;
