import { LatLng } from "leaflet";
import { GeoJsonObject } from "geojson";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const turf = require("@turf/turf");

type MapContextProps = {
  mapFeatures?: GeoJsonObject;
  centerOfFeatures?: LatLng;
  mapLoading: boolean;
  mapError?: string;
};

const MapContext = createContext<MapContextProps>({
  mapLoading: false,
});

export function MapProvider({ children }: { children: ReactNode }) {
  const [features, setFeatures] = useState<GeoJsonObject>();
  const [centerOfFeatures, setCenterOfFeatures] = useState<LatLng>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/region-data`)
      .then((response) => response.json())
      .then((res) => {
        setFeatures(res.features);

        // Sets the default center to be around the features
        // Needs to be reversed as turf center's coords returns [Long, Lat]
        // And Leaflet uses [Lat, Long]
        setCenterOfFeatures(turf.center(res).geometry.coordinates.reverse());
      })
      .catch((err) => {
        setError(`Error occured: ${err}`);
      })
      .finally(() => setLoading(false));
  }, []);

  const context = useMemo(
    () => ({
      mapFeatures: features,
      centerOfFeatures,
      mapLoading: loading,
      mapError: error,
    }),
    [centerOfFeatures, features, error, loading]
  );
  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
}

export function useMap() {
  return useContext(MapContext);
}
