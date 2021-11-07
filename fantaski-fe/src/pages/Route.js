import React from "react";
import Navbar from "../components/route/Navbar";
import Map from "../components/route/Map";
// import MapMask from "../components/route/MapMask";
// import SnowInformation from "./components/SnowInformation";
// import SnowOpen from "./components/SnowOpen";
import Place from "../components/route/Place";
import Cablecar from "../components/route/Cablecar";
import ProdoctRent from "../components/route/ProdoctRent";
function Route() {
  return (
    <div>
      <Navbar />
      <Map />
      {/* <MapMask /> */}

      <Place />
      {/* <SnowInformation /> */}
      {/* <SnowOpen /> */}
      <Cablecar />
      <ProdoctRent />
    </div>
  );
}

export default Route;
