export const MapConfigs = {
  MAP_ZOOM: 10,
  MAP_HEIGHT: "100vh",
};

export const CircleDefaults = {
  CIRCLE_RADIUS: 50,
  CIRCLE_POSITION: undefined,
};

export enum Method {
  CENTROID_BASED_METHOD = "centroidBasedMethod",
  AREAL_PROPORTION_METHOD = "arealProportionMethod",
}

export const METHODS = {
  [Method.CENTROID_BASED_METHOD]: "Centroid Based Method",
  [Method.AREAL_PROPORTION_METHOD]: "Areal Proportion Method",
};
