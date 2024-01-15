import { Typography } from "@mui/material";
import { CSSProperties } from "react";
import ColorPicker from "./ColorPicker";
import { useLegendConfig } from "../../../hooks/useLegendConfig";
import {
  CIRCLE_COLOR_OPTIONS,
  FEATURES_COLOR_OPTIONS,
  SELECTED_FEATURES_COLOR_OPTIONS,
} from "../../../consts/LegendColor";

export default function MapLegendConfig() {
  const {
    featuresColor,
    selectedFeaturesColor,
    circleColor,
    handleCircleColorChange,
    handleFeaturesColorChange,
    handleSelectedFeaturesColorChange,
  } = useLegendConfig();

  return (
    <div style={STYLES.container}>
      <Typography variant="h5">
        <b>Personalization</b>
      </Typography>
      <ColorPicker
        title="Circle Color"
        currentColor={circleColor}
        colorOptions={CIRCLE_COLOR_OPTIONS}
        handleColorChange={handleCircleColorChange}
      />
      <ColorPicker
        title="Features Color"
        currentColor={featuresColor}
        colorOptions={FEATURES_COLOR_OPTIONS}
        handleColorChange={handleFeaturesColorChange}
      />
      <ColorPicker
        title="Selected Features Color"
        currentColor={selectedFeaturesColor}
        colorOptions={SELECTED_FEATURES_COLOR_OPTIONS}
        handleColorChange={handleSelectedFeaturesColorChange}
      />
    </div>
  );
}

const STYLES: { [x: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
};
