import { useUserConfig } from "../../../hooks/useUserConfig";
import { CircleConfig } from "../../../consts/UserRadius";
import {
  Input,
  Slider,
  Typography,
  FormControlLabel,
  Radio,
  Button,
  RadioGroup,
  Switch,
  Divider,
} from "@mui/material";
import { METHODS, Method } from "../../../consts/MapConfigs";
import { CSSProperties, useState } from "react";

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
  // Prevent laggy slider by setting an immediate value for the slider
  const [radiusSliderValue, setRadiusSliderValue] = useState(currentRadius);
  const handleRadiusSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => setRadiusSliderValue(newValue as number);

  // Update current radius from the slider on change commited
  const handleRadiusSliderChangeCommited = (
    _: any,
    value: number | number[]
  ) => {
    handleRadiusChange(value as number);
  };
  const handleRadiusInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value === "" ? 0 : Number(event.target.value);

    setRadiusSliderValue(newValue);
    handleRadiusChange(newValue);
  };
  const handleRadiusBlur = () => {
    if (currentRadius < CircleConfig.MIN_RADIUS) {
      setRadiusSliderValue(CircleConfig.MIN_RADIUS);
      handleRadiusChange(CircleConfig.MIN_RADIUS);
    } else if (currentRadius > CircleConfig.MAX_RADIUS) {
      setRadiusSliderValue(CircleConfig.MAX_RADIUS);
      handleRadiusChange(CircleConfig.MAX_RADIUS);
    }
  };

  return (
    <div style={STYLES.container}>
      <Typography variant="h5">
        <b>Settings</b>
      </Typography>
      <div style={STYLES.subContainer}>
        <Typography>
          <b>Method of Calculation</b>
        </Typography>
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
      </div>
      {/* Only show centroids config on Method.CENTROID_BASED_METHOD. See README.md/Business Logic #1 */}
      {methodOfCalculation === Method.CENTROID_BASED_METHOD && (
        <div style={STYLES.subContainer}>
          <Typography>
            <b>Display</b>
          </Typography>
          <div style={STYLES.spaceBetweenContainer}>
            Show centroid for each feature
            <Switch
              checked={showCentroids}
              onChange={handleShowCentroidsToggle}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
      )}
      <Divider />
      <div style={STYLES.subContainer}>
        <Typography>
          <b>Circle Radius (in meters)</b>
        </Typography>
        <div style={STYLES.spaceBetweenContainer}>
          <Slider
            value={
              typeof radiusSliderValue === "number" ? radiusSliderValue : 0
            }
            onChange={handleRadiusSliderChange}
            onChangeCommitted={handleRadiusSliderChangeCommited}
            aria-labelledby="circle-radius-slider"
            min={CircleConfig.MIN_RADIUS}
            max={CircleConfig.MAX_RADIUS}
          />
          <Input
            value={radiusSliderValue}
            size="small"
            onChange={handleRadiusInputChange}
            onBlur={handleRadiusBlur}
            inputProps={{
              step: 10,
              min: CircleConfig.MIN_RADIUS,
              max: CircleConfig.MAX_RADIUS,
              type: "number",
              "aria-labelledby": "circle-radius-input",
            }}
            style={{ width: 100 }}
          />
        </div>
      </div>
      <Button variant="contained" color="error" onClick={handleCircleReset}>
        Reset Circle
      </Button>
    </div>
  );
}

const STYLES: { [x: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  spaceBetweenContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
  },
};
