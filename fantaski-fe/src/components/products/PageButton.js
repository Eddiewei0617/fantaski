import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function PageButton({
  setPageButton,
  pageButton,
  handlePageButton,
  products,
  pageNow,
  setPageNow,
  onClick,
}) {
  const pageNumber = [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
  ];
  useEffect(() => {
    setPageButton(1);
  }, []);

  console.log("pro", products);

  return (
    <>
      <div className="page_button ">
        <div
          onClick={() => {
            if (pageButton > 1) {
              setPageButton(pageButton - 1);
              setPageNow(pageNow - 1);
              onClick();
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
                onClick={(e) => {
                  if (products === []) {
                    setPageNow(1);
                  } else {
                    handlePageButton(e);
                    setPageNow(`${v.id}`);
                    onClick();
                  }
                }}
              >
                {v.name}
              </li>
            );
          })}
        </ul>

        <div
          onClick={() => {
            if (pageButton < pageNumber.length || !products) {
              setPageButton(pageButton + 1);
              setPageNow(pageNow + 1);
              onClick();
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
