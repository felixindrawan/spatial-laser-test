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

type CentroidsInCircleContextProps = {
  featuresInCircle?: GeoJsonObject;
  handleCircleUpdate: (position: LatLng, radius: number) => void;
};

const CentroidsInCircleContext = createContext<CentroidsInCircleContextProps>({
  handleCircleUpdate: () => {},
});

export function CentroidsInCircleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [featuresInCircle, setFeaturesInCircle] = useState<GeoJsonObject>();

  // On user circle updating, we need to update the keys
  const handleCircleUpdate = useCallback(
    async (position: LatLng, radius: number) => {
      await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/centroids-in-circle-data`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position,
            radius,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setFeaturesInCircle(res.features);
        })
        .catch((err) => {
          console.error("Failed to retrieve results", err);
        });
    },
    []
  );
  const context = useMemo(
    () => ({
      featuresInCircle,
      handleCircleUpdate,
    }),
    [featuresInCircle, handleCircleUpdate]
  );
  return (
    <CentroidsInCircleContext.Provider value={context}>
      {children}
    </CentroidsInCircleContext.Provider>
  );
}

export function useCentroidsInCircle() {
  return useContext(CentroidsInCircleContext);
}
