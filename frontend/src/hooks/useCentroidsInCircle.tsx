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
  loadingFeaturesInCircle: boolean;
  handleCircleUpdate: (position: LatLng, radius: number) => void;
  handleFeaturesInCircleReset: () => void;
};

const CentroidsInCircleContext = createContext<CentroidsInCircleContextProps>({
  loadingFeaturesInCircle: false,
  handleCircleUpdate: () => {},
  handleFeaturesInCircleReset: () => {},
});

export function CentroidsInCircleProvider({
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
    async (position: LatLng, radius: number) => {
      setLoading(true);
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
    <CentroidsInCircleContext.Provider value={context}>
      {children}
    </CentroidsInCircleContext.Provider>
  );
}

export function useCentroidsInCircle() {
  return useContext(CentroidsInCircleContext);
}
