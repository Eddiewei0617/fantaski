import React, { useState, useEffect } from "react";
import { ImArrowUp } from "react-icons/im";

function Gotop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 100 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button className="go-top topClick" onClick={scrollToTop}>
          <ImArrowUp className="top-arrow" />
        </button>
      )}
    </>
  );
}

export default Gotop;
