import { Grid, Typography } from "@mui/material";
import { USDollar } from "../../../utils/NumberTransform";
import { useCalculation } from "../../../hooks/useCalculation";

export default function CalculationResults() {
  const { totalPopulation, avgIncome } = useCalculation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Census Data</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <b>Total Population</b>
        </Typography>
        <Typography>{Math.round(totalPopulation ?? 0)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <b>Average Income</b>
        </Typography>
        <Typography>{USDollar.format(avgIncome ?? 0)}</Typography>
      </Grid>
    </Grid>
  );
}
