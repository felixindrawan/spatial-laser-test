import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  CIRCLE_COLOR_OPTIONS,
  FEATURES_COLOR_OPTIONS,
  LEGEND_COLORS,
  LegendColors,
  SELECTED_FEATURES_COLOR_OPTIONS,
} from "../consts/LegendColor";
import { useLocalStorage } from "@uidotdev/usehooks";

type LegendConfigContextProps = {
  featuresColor?: string;
  selectedFeaturesColor?: string;
  circleColor?: string;
  handleFeaturesColorChange: (newColor: LegendColors) => void;
  handleSelectedFeaturesColorChange: (newColor: LegendColors) => void;
  handleCircleColorChange: (newColor: LegendColors) => void;
};

const LegendConfigContext = createContext<LegendConfigContextProps>({
  handleFeaturesColorChange: () => {},
  handleSelectedFeaturesColorChange: () => {},
  handleCircleColorChange: () => {},
});

export function LegendConfigProvider({ children }: { children: ReactNode }) {
  const [featuresColor, setFeaturesColor] = useLocalStorage(
    "featuresColor",
    LEGEND_COLORS[FEATURES_COLOR_OPTIONS[0]]
  );
  const [selectedFeaturesColor, setSelectedFeaturesColor] = useLocalStorage(
    "selectedFeaturesColor",
    LEGEND_COLORS[SELECTED_FEATURES_COLOR_OPTIONS[0]]
  );
  const [circleColor, setCircleColor] = useLocalStorage(
    "circleColor",
    LEGEND_COLORS[CIRCLE_COLOR_OPTIONS[0]]
  );

  const handleFeaturesColorChange = useCallback(
    (newColor: LegendColors) => setFeaturesColor(LEGEND_COLORS[newColor]),
    [setFeaturesColor]
  );
  const handleSelectedFeaturesColorChange = useCallback(
    (newColor: LegendColors) =>
      setSelectedFeaturesColor(LEGEND_COLORS[newColor]),
    [setSelectedFeaturesColor]
  );
  const handleCircleColorChange = useCallback(
    (newColor: LegendColors) => setCircleColor(LEGEND_COLORS[newColor]),
    [setCircleColor]
  );

  const context = useMemo(
    () => ({
      featuresColor,
      selectedFeaturesColor,
      circleColor,
      handleFeaturesColorChange,
      handleSelectedFeaturesColorChange,
      handleCircleColorChange,
    }),
    [
      featuresColor,
      selectedFeaturesColor,
      circleColor,
      handleFeaturesColorChange,
      handleSelectedFeaturesColorChange,
      handleCircleColorChange,
    ]
  );
  return (
    <LegendConfigContext.Provider value={context}>
      {children}
    </LegendConfigContext.Provider>
  );
}

export function useLegendConfig() {
  return useContext(LegendConfigContext);
}
