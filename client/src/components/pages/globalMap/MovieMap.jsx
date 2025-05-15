import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

import {Tooltip} from "react-tooltip";


const geoUrl =
  "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const MovieMap = () => {

  return (
    <>
      <ComposableMap data-tip="" className="border border-accent w-[50%] mx-auto">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MovieMap;
