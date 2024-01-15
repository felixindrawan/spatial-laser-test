import { Typography } from "@mui/material";
import { useCalculation } from "../../../hooks/useCalculation";
import { USDollar } from "../../../utils/NumberTransform";
import MapDataBoxes from "../MapDataBoxes";

export default function CensusData() {
  const { totalPopulation, avgIncome } = useCalculation();

  return (
    <MapDataBoxes title={"Census Data"}>
      <Typography>
        <b>Total Population</b>
      </Typography>
      <Typography>{Math.round(totalPopulation ?? 0)}</Typography>
      <Typography>
        <b>Average Income</b>
      </Typography>
      <Typography>{USDollar.format(avgIncome ?? 0)}</Typography>
    </MapDataBoxes>
  );
}
