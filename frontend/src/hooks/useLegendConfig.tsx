import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  CIRCLE_COLOR_OPTIONS,
  FEATURES_COLOR_OPTIONS,
  LEGEND_COLORS,
  LegendColors,
  SELECTED_FEATURES_COLOR_OPTIONS,
} from "../consts/LegendColor";

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
  const [featuresColor, setFeaturesColor] = useState(
    LEGEND_COLORS[FEATURES_COLOR_OPTIONS[0]]
  );
  const [selectedFeaturesColor, setSelectedFeaturesColor] = useState(
    LEGEND_COLORS[SELECTED_FEATURES_COLOR_OPTIONS[0]]
  );
  const [circleColor, setCircleColor] = useState(
    LEGEND_COLORS[CIRCLE_COLOR_OPTIONS[0]]
  );

  const handleFeaturesColorChange = useCallback(
    (newColor: LegendColors) => setFeaturesColor(LEGEND_COLORS[newColor]),
    []
  );
  const handleSelectedFeaturesColorChange = useCallback(
    (newColor: LegendColors) =>
      setSelectedFeaturesColor(LEGEND_COLORS[newColor]),
    []
  );
  const handleCircleColorChange = useCallback(
    (newColor: LegendColors) => setCircleColor(LEGEND_COLORS[newColor]),
    []
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
