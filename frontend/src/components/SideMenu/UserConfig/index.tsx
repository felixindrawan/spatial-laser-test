import { useUserConfig } from "../../../hooks/useUserConfig";
import { CircleConfig } from "../../../consts/UserRadius";
import {
  Grid,
  Input,
  Slider,
  Typography,
  FormControlLabel,
  Radio,
  Button,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import { METHODS, Method } from "../../../consts/MapConfigs";

export default function UserConfig() {
  const {
    currentRadius,
    handleRadiusChange,
    handleCircleReset,
    methodOfCalculation,
    handleMethodChange,
    showCentroids,
    handleShowCentroidsToggle,
  } = useUserConfig();

  const handleRadiusSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    handleRadiusChange(newValue as number);
  };
  const handleRadiusInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleRadiusChange(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  const handleRadiusBlur = () => {
    if (currentRadius < CircleConfig.MIN_RADIUS) {
      handleRadiusChange(CircleConfig.MIN_RADIUS);
    } else if (currentRadius > CircleConfig.MAX_RADIUS) {
      handleRadiusChange(CircleConfig.MAX_RADIUS);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Configs</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Display</Typography>

        <FormControlLabel
          value={showCentroids}
          onChange={handleShowCentroidsToggle}
          control={<Checkbox />}
          label="Show Centroids"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>Method</Typography>
        <RadioGroup
          aria-labelledby="method-radio-buttons"
          name="radio-buttons-group"
          value={methodOfCalculation}
          onChange={(e) => handleMethodChange(e.target.value as Method)}
        >
          {Object.values(Method).map((m) => (
            <FormControlLabel
              key={m}
              value={m}
              control={<Radio />}
              label={METHODS[m]}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography>Radius (in meters)</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={8} item>
            <Slider
              value={typeof currentRadius === "number" ? currentRadius : 0}
              onChange={handleRadiusSliderChange}
              aria-labelledby="circle-radius-slider"
              min={CircleConfig.MIN_RADIUS}
              max={CircleConfig.MAX_RADIUS}
            />
          </Grid>
          <Grid xs={4} item>
            <Input
              value={currentRadius}
              size="small"
              onChange={handleRadiusInputChange}
              onBlur={handleRadiusBlur}
              inputProps={{
                step: 10,
                min: CircleConfig.MIN_RADIUS,
                max: CircleConfig.MAX_RADIUS,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="error" onClick={handleCircleReset}>
          Reset Circle
        </Button>
      </Grid>
    </Grid>
  );
}
