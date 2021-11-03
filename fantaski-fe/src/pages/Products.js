import { useState, useEffect } from "react";
import "animate.css";

import CarouselP from "../components/products/CarouselP";
import ScrolldownIcon from "../components/products/ScrolldownIcon";
import SwitchIcon from "../components/products/SwitchIcon";
import NavSide from "../components/products/NavSide";
// import ProductSquare from "../components/products/ProductSquare";
import ProductList from "../components/products/ProductList";

function Products() {
  return (
    <>
      <CarouselP />
      <ScrolldownIcon />
      <SwitchIcon />
      <div className="d-flex">
        <NavSide />
        {/* <ProductSquare /> */}
        <ProductList />
      </div>
    </>
  );
}
export default Products;
