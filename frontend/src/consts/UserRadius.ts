import { LatLng } from "leaflet";

export const CircleConfig = {
  MAX_RADIUS: 50000,
  MIN_RADIUS: 0,
};

export const CircleDefaults = {
  CIRCLE_RADIUS: 3000,
  CIRCLE_POSITION: { lat: null, lng: null } as unknown as LatLng,
};
