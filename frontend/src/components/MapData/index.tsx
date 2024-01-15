import { CSSProperties } from "react";
import CensusData from "./CensusData";
import MapLegend from "./MapLegend";

export default function MapData() {
  return (
    <div style={STYLES.container}>
      <CensusData />
      <MapLegend />
    </div>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    width: 250,
    position: "absolute",
    bottom: 30,
    left: 10,
    zIndex: 1000,
    display: "flex",
    gap: 10,
    flexDirection: "column",
  },
};
