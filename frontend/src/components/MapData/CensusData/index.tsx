import { Card, Divider, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { useCalculation } from "../../../hooks/useCalculation";
import { USDollar } from "../../../utils/NumberTransform";

export default function CensusData() {
  const { totalPopulation, avgIncome } = useCalculation();

  return (
    <Card style={STYLES.container} variant="outlined">
      <div style={STYLES.content}>
        <Typography>
          <b>Census Data</b>
        </Typography>
        <Divider />
        <Typography>
          <b>Total Population</b>
        </Typography>
        <Typography>{Math.round(totalPopulation ?? 0)}</Typography>
        <Typography>
          <b>Average Income</b>
        </Typography>
        <Typography>{USDollar.format(avgIncome ?? 0)}</Typography>
      </div>
    </Card>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    width: "100%",
    border: "2px solid rgba(0,0,0,0.2)",
  },
  content: {
    display: "flex",
    gap: 5,
    flexDirection: "column",
    padding: 10,
  },
};
