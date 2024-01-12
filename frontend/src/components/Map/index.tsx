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

export default function Map() {
  const { mapFeatures, centerOfFeatures, mapLoading, mapError } = useMap();
  const {
    currentRadius,
    currentPosition,
    showCentroids,
    handlePositionChange,
  } = useUserConfig();

  const onMapClick = useCallback(
    (coordinates: LatLng) => {
      handlePositionChange(coordinates);
    },
    [handlePositionChange]
  );

  if (mapError) {
    return <ErrorAlert title="Failed to load Map" message={mapError} />;
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
    iconUrl: "https://cdn-icons-png.flaticon.com/512/9455/9455172.png",
    iconSize: [12, 12],
  });
  return (
    <div style={{ height: MapConfigs.MAP_HEIGHT }}>
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
        {mapFeatures && <GeoJSON data={mapFeatures} />}
        <MapClick onMapClick={onMapClick} />
        {showCentroids &&
          centroids.map((c: any, i: number) => (
            <Marker key={i} position={c} icon={centroidIcon} />
          ))}
        {currentPosition && (
          <Circle
            center={currentPosition}
            radius={currentRadius}
            fillColor="yellow"
            color="yellow"
          ></Circle>
        )}
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
