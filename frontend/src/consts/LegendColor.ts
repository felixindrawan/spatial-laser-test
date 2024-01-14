export enum LegendColors {
  BLUE = "blue",
  MAGENTA = "magenta",
  BLACK = "black",
  YELLOW = "yellow",
}

export const LEGEND_COLORS: Record<LegendColors, string> = {
  [LegendColors.BLUE]: "rgb(51, 136, 255)",
  [LegendColors.MAGENTA]: "rgb(255, 51, 255)",
  [LegendColors.BLACK]: "black",
  [LegendColors.YELLOW]: "yellow",
};

export const FEATURES_COLOR_OPTIONS: LegendColors[] = [
  LegendColors.BLUE,
  LegendColors.MAGENTA,
];

export const SELECTED_FEATURES_COLOR_OPTIONS: LegendColors[] = [
  LegendColors.BLACK,
];

export const CIRCLE_COLOR_OPTIONS: LegendColors[] = [LegendColors.YELLOW];
