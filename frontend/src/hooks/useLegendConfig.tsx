import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { LEGEND_COLORS, LegendColors } from "../consts/LegendColor";

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
    LEGEND_COLORS[LegendColors.BLUE]
  );
  const [selectedFeaturesColor, setSelectedFeaturesColor] = useState(
    LEGEND_COLORS[LegendColors.BLACK]
  );
  const [circleColor, setCircleColor] = useState(
    LEGEND_COLORS[LegendColors.YELLOW]
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
