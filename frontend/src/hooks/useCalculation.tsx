import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Method } from "../consts/MapConfigs";
import { LatLng } from "leaflet";
import { useCentroidsInCircle } from "./useCentroidsInCircle";

type CalculationContextProps = {
  totalPopulation: number;
  avgIncome: number;
  handleResultsChange: (
    methodOfCalculation: Method,
    radius: number,
    position?: LatLng
  ) => void;
};

const CalculationContext = createContext<CalculationContextProps>({
  totalPopulation: 0,
  avgIncome: 0,
  handleResultsChange: () => {},
});

export function CalculationProvider({ children }: { children: ReactNode }) {
  const [totalPopulation, setTotalPopulation] = useState<number>(0);
  const [avgIncome, setAvgIncome] = useState<number>(0);
  const { handleCircleUpdate, handleFeaturesInCircleReset } =
    useCentroidsInCircle();

  const handleResultsChange = useCallback(
    async (methodOfCalculation: Method, radius: number, position?: LatLng) => {
      if (!position) {
        setTotalPopulation(0);
        setAvgIncome(0);
        handleFeaturesInCircleReset();
        return;
      }

      // Reset any features in circle on change. See README/Business Logic 2
      handleFeaturesInCircleReset();
      // Get keys of features inside the circle. See README/Business Logic 1
      if (methodOfCalculation === Method.CENTROID_BASED_METHOD) {
        handleCircleUpdate(position, radius);
      }

      // Calculate total population and avgIncome
      const results = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/results-data`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            calculationMethod: methodOfCalculation,
            position,
            radius,
          }),
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error("Failed to retrieve results", err);
        });
      if (results?.totalPopulation && results?.avgIncome) {
        setTotalPopulation(results.totalPopulation);
        setAvgIncome(results.avgIncome);
      } else {
        setTotalPopulation(0);
        setAvgIncome(0);
      }
    },
    [handleCircleUpdate, handleFeaturesInCircleReset]
  );

  const context = useMemo(
    () => ({
      totalPopulation,
      avgIncome,
      handleResultsChange,
    }),
    [totalPopulation, handleResultsChange, avgIncome]
  );
  return (
    <CalculationContext.Provider value={context}>
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculation() {
  return useContext(CalculationContext);
}
