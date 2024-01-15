import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  Circle,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLng } from "leaflet";
import { useCallback } from "react";
import { useUserConfig } from "../../hooks/useUserConfig";
import { MapConfigs } from "../../consts/MapConfigs";
import { useMap } from "../../hooks/useMap";
import Loading from "../Loading";
import ErrorAlert from "../Error";
import { useSelectedFeaturesInCircle } from "../../hooks/useSelectedFeaturesInCircle";
import { useLegendConfig } from "../../hooks/useLegendConfig";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Map() {
  const { mapFeatures, centerOfFeatures, mapLoading, mapError } = useMap();
  const {
    currentRadius,
    currentPosition,
    showCentroids,
    handlePositionChange,
  } = useUserConfig();
  const { featuresInCircle, loadingFeaturesInCircle } =
    useSelectedFeaturesInCircle();
  const { featuresColor, selectedFeaturesColor, circleColor } =
    useLegendConfig();

  const onMapClick = useCallback(
    (coordinates: LatLng) => {
      handlePositionChange(coordinates);
    },
    [handlePositionChange]
  );

  if (mapError) {
    return (
      <div style={{ height: "100vh" }}>
        <ErrorAlert title="Failed to load Map" message={mapError} />
      </div>
    );
  }

  if (mapLoading || !centerOfFeatures) {
    return <Loading fullScreen />;
  }

  // Get centroids of each feature
  const centroids = (mapFeatures as any)?.map(
    ({ properties }: { properties: any }) => {
      const [lng, lat] = properties.centroid_coordinate;
      return [lat, lng];
    }
  );
  const centroidIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7500/7500224.png",
    iconSize: [24, 24],
  });

  return (
    <div style={{ height: MapConfigs.MAP_HEIGHT }}>
      {/* Loading for features in circle */}
      <Backdrop open={loadingFeaturesInCircle} style={{ zIndex: 1000 }}>
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
      {/* Map */}
      <MapContainer
        center={centerOfFeatures}
        zoom={MapConfigs.MAP_ZOOM}
        scrollWheelZoom
        style={{ height: MapConfigs.MAP_HEIGHT }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {featuresInCircle && (
          <GeoJSON
            data={featuresInCircle}
            style={{ fill: true, color: selectedFeaturesColor }}
          />
        )}
        {mapFeatures && (
          <GeoJSON data={mapFeatures} style={{ color: featuresColor }} />
        )}
        {showCentroids &&
          centroids.map((c: any, i: number) => (
            <Marker key={i} position={c} icon={centroidIcon} />
          ))}
        {currentPosition && (
          <Circle
            center={currentPosition}
            radius={currentRadius}
            pathOptions={{
              color: circleColor,
            }}
          ></Circle>
        )}
        <MapClick onMapClick={onMapClick} />
      </MapContainer>
    </div>
  );
}

// Handles all map click events
function MapClick({
  onMapClick,
}: {
  onMapClick: (coordinates: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      const coordinates = e.latlng;
      onMapClick(coordinates);
    },
  });

  return null;
}
