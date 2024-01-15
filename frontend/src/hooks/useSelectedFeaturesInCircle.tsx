import { LatLng } from "leaflet";
import { GeoJsonObject } from "geojson";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Method } from "../consts/MapConfigs";

type SelectedFeaturesInCircleContextProps = {
  featuresInCircle?: GeoJsonObject;
  loadingFeaturesInCircle: boolean;
  handleCircleUpdate: (
    position: LatLng,
    radius: number,
    methodOfCalculation: Method
  ) => void;
  handleFeaturesInCircleReset: () => void;
};

const SelectedFeaturesInCircleContext =
  createContext<SelectedFeaturesInCircleContextProps>({
    loadingFeaturesInCircle: false,
    handleCircleUpdate: () => {},
    handleFeaturesInCircleReset: () => {},
  });

export function SelectedFeaturesInCircleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [featuresInCircle, setFeaturesInCircle] = useState<GeoJsonObject>();
  const [loading, setLoading] = useState(false);
  const handleFeaturesInCircleReset = useCallback(() => {
    setFeaturesInCircle(undefined);
  }, []);

  // On user circle updating, we need to update the keys
  const handleCircleUpdate = useCallback(
    async (position: LatLng, radius: number, methodOfCalculation: Method) => {
      const endPoint =
        methodOfCalculation === Method.AREAL_PROPORTION_METHOD
          ? "intersection-in-circle-data"
          : "centroids-in-circle-data";

      setLoading(true);
      await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${endPoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position,
          radius,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setFeaturesInCircle(res.features);
        })
        .catch((err) => {
          console.error("Failed to retrieve results", err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );
  const context = useMemo(
    () => ({
      featuresInCircle,
      loadingFeaturesInCircle: loading,
      handleCircleUpdate,
      handleFeaturesInCircleReset,
    }),
    [featuresInCircle, handleCircleUpdate, handleFeaturesInCircleReset, loading]
  );
  return (
    <SelectedFeaturesInCircleContext.Provider value={context}>
      {children}
    </SelectedFeaturesInCircleContext.Provider>
  );
}

export function useSelectedFeaturesInCircle() {
  return useContext(SelectedFeaturesInCircleContext);
}
