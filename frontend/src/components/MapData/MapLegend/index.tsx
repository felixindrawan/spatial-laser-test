import { useLegendConfig } from "../../../hooks/useLegendConfig";
import {
  CIRCLE_COLOR_OPTIONS,
  FEATURES_COLOR_OPTIONS,
  SELECTED_FEATURES_COLOR_OPTIONS,
} from "../../../consts/LegendColor";
import MapDataBoxes from "../MapDataBoxes";
import ColorAndTextGrid from "./ColorAndTextGrid";

export default function MapLegend() {
  const {
    featuresColor,
    selectedFeaturesColor,
    circleColor,
    handleCircleColorChange,
    handleFeaturesColorChange,
    handleSelectedFeaturesColorChange,
  } = useLegendConfig();

  return (
    <MapDataBoxes title={"Map Legend"}>
      <ColorAndTextGrid
        color={circleColor as string}
        text="Circle"
        colorOptions={CIRCLE_COLOR_OPTIONS}
        handleColorChange={handleCircleColorChange}
      />
      <ColorAndTextGrid
        color={featuresColor as string}
        text="Features"
        colorOptions={FEATURES_COLOR_OPTIONS}
        handleColorChange={handleFeaturesColorChange}
      />
      <ColorAndTextGrid
        color={selectedFeaturesColor as string}
        text="Selected Features"
        colorOptions={SELECTED_FEATURES_COLOR_OPTIONS}
        handleColorChange={handleSelectedFeaturesColorChange}
      />
    </MapDataBoxes>
  );
}
