import { useState, useEffect } from "react";
import "animate.css";

import CarouselP from "../components/products/CarouselP";
import ScrolldownIcon from "../components/products/ScrolldownIcon";
import SwitchIcon from "../components/products/SwitchIcon";
import NavSide from "../components/products/NavSide";

function ProductList() {
  return (
    <>
      <CarouselP />
      <ScrolldownIcon />
      <SwitchIcon />
      <NavSide />
    </>
  );
}
export default ProductList;
