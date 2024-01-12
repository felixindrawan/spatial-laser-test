import { LatLng } from "leaflet";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CircleDefaults, Method } from "../consts/MapConfigs";
import { useCalculation } from "./useCalculation";

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
  showCentroids: false,
  handleShowCentroidsToggle: () => {},
});

export function UserConfigProvider({ children }: { children: ReactNode }) {
  const [radius, setRadius] = useState<number>(50); // In meters
  const [position, setPosition] = useState<LatLng>();
  const [methodOfCalculation, setMethodOfCalculation] = useState<Method>(
    Method.CENTROID_BASED_METHOD
  );
  const [showCentroids, setShowCentroids] = useState<boolean>(false);

  const { handleResultsChange } = useCalculation();

  const handleMethodChange = useCallback(
    (newMethod: Method) => {
      setMethodOfCalculation(newMethod);
      if (position) {
        handleResultsChange(newMethod, radius, position);
      }
    },
    [handleResultsChange, radius, position]
  );
  const handleRadiusChange = useCallback(
    (newRadius: number) => {
      setRadius(newRadius);
      // only change results if position exists
      if (position) {
        handleResultsChange(methodOfCalculation, newRadius, position);
      }
    },
    [handleResultsChange, methodOfCalculation, position]
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
  }, [handleResultsChange, methodOfCalculation]);
  const handleShowCentroidsToggle = useCallback(() => {
    setShowCentroids(!showCentroids);
  }, [showCentroids]);

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
