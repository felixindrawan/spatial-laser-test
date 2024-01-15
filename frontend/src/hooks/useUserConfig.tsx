import { LatLng } from "leaflet";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Method } from "../consts/MapConfigs";
import { useCalculation } from "./useCalculation";
import { CircleDefaults } from "../consts/UserRadius";
import { useLocalStorage } from "@uidotdev/usehooks";

type UserConfigContextProps = {
  currentRadius: number;
  handleRadiusChange: (newRadius: number) => void;
  currentPosition?: LatLng;
  handlePositionChange: (newPosition: LatLng) => void;
  handleCircleReset: () => void;
  methodOfCalculation: Method;
  handleMethodChange: (newMethod: Method) => void;
  showCentroids: boolean;
  handleShowCentroidsToggle: () => void;
};

const UserConfigContext = createContext<UserConfigContextProps>({
  currentRadius: CircleDefaults.CIRCLE_RADIUS,
  handleRadiusChange: () => {},
  handlePositionChange: () => {},
  handleCircleReset: () => {},
  methodOfCalculation: Method.CENTROID_BASED_METHOD,
  handleMethodChange: () => {},
  showCentroids: true,
  handleShowCentroidsToggle: () => {},
});

export function UserConfigProvider({ children }: { children: ReactNode }) {
  const [radius, setRadius] = useLocalStorage<number>(
    "circleRadius",
    CircleDefaults.CIRCLE_RADIUS
  ); // In meters
  const [position, setPosition] = useState<LatLng>(
    CircleDefaults.CIRCLE_POSITION
  );
  const [methodOfCalculation, setMethodOfCalculation] = useLocalStorage<Method>(
    "methodOfCalculation",
    Method.CENTROID_BASED_METHOD
  );
  const [showCentroids, setShowCentroids] = useLocalStorage<boolean>(
    "showCentroids",
    true
  );

  const { handleResultsChange } = useCalculation();

  const handleMethodChange = useCallback(
    (newMethod: Method) => {
      setMethodOfCalculation(newMethod);
      if (position) {
        handleResultsChange(newMethod, radius, position);
      }
    },
    [handleResultsChange, radius, position, setMethodOfCalculation]
  );
  const handleRadiusChange = useCallback(
    (newRadius: number) => {
      setRadius(newRadius);
      // only change results if position exists
      if (position) {
        handleResultsChange(methodOfCalculation, newRadius, position);
      }
    },
    [handleResultsChange, methodOfCalculation, position, setRadius]
  );
  const handlePositionChange = useCallback(
    (newPosition: LatLng) => {
      setPosition(newPosition);
      handleResultsChange(methodOfCalculation, radius, newPosition);
    },
    [handleResultsChange, methodOfCalculation, radius]
  );

  const handleCircleReset = useCallback(() => {
    setRadius(CircleDefaults.CIRCLE_RADIUS);
    setPosition(CircleDefaults.CIRCLE_POSITION);
    handleResultsChange(
      methodOfCalculation,
      CircleDefaults.CIRCLE_RADIUS,
      CircleDefaults.CIRCLE_POSITION
    );
  }, [handleResultsChange, methodOfCalculation, setRadius]);
  const handleShowCentroidsToggle = useCallback(() => {
    setShowCentroids(!showCentroids);
  }, [showCentroids, setShowCentroids]);

  const context = useMemo(
    () => ({
      currentRadius: radius,
      currentPosition: position,
      handleRadiusChange,
      handlePositionChange,
      handleCircleReset,
      methodOfCalculation,
      handleMethodChange,
      showCentroids,
      handleShowCentroidsToggle,
    }),
    [
      radius,
      position,
      handleRadiusChange,
      handlePositionChange,
      handleCircleReset,
      methodOfCalculation,
      handleMethodChange,
      showCentroids,
      handleShowCentroidsToggle,
    ]
  );
  return (
    <UserConfigContext.Provider value={context}>
      {children}
    </UserConfigContext.Provider>
  );
}

export function useUserConfig() {
  return useContext(UserConfigContext);
}
