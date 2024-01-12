import { Grid, Typography } from "@mui/material";
import { USDollar, decimalsFormat } from "../../../utils/NumberTransform";
import { useCalculation } from "../../../hooks/useCalculation";

export default function CalculationResults() {
  const { totalPopulation, avgIncome } = useCalculation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Results</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Total Population</Typography>
        <Typography>{decimalsFormat(totalPopulation ?? 0)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Average Income</Typography>
        <Typography>{USDollar.format(avgIncome ?? 0)}</Typography>
      </Grid>
    </Grid>
  );
}
