import React from "react";
// import Navbar from "../components/route/Navbar";
import Map from "../components/route/Map";
// import MapMask from "../components/route/MapMask";
// import SnowInformation from "./components/SnowInformation";
// import SnowOpen from "./components/SnowOpen";
import Place from "../components/route/Place";
import Cablecar from "../components/route/Cablecar";
import ProductRent from "../components/route/ProductRent";
function MountainRoute({ setColorButton }) {
  return (
    <div>
      {/* <Navbar /> */}
      <Map setColorButton={setColorButton} />
      {/* <MapMask /> */}

      <Place />
      {/* <SnowInformation /> */}
      {/* <SnowOpen /> */}
      <Cablecar />
      <ProductRent setColorButton={setColorButton} />
    </div>
  );
}

export default MountainRoute;
