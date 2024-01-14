export enum LegendColors {
  // Features Colors
  BLUE = "Blue",
  MINT_GREEN = "Mint Green",

  ORANGE = "Orange",

  // Selected Features Colors
  DARK_BLUE = "Dark Blue",
  DARK_GREEN = "Dark Green",
  DARK_PLUM = "Dark Plum",

  // Circle Colors
  BRIGHT_RED = "Bright Red",
  GOLD = "Gold",
  YELLOW = "Yellow",
  TURQOUISE = "Turquoise",
}

export const LEGEND_COLORS: Record<LegendColors, string> = {
  // Features Colors
  [LegendColors.BLUE]: "rgb(51, 136, 255)",
  [LegendColors.MINT_GREEN]: "#98FB98",
  [LegendColors.ORANGE]: "#FFA500",

  // Selected Features Colors
  [LegendColors.DARK_BLUE]: "#1A4A9F",
  [LegendColors.DARK_GREEN]: "#006400",

  [LegendColors.DARK_PLUM]: "#632D56",

  // Circle Colors
  [LegendColors.BRIGHT_RED]: "#FF3300",
  [LegendColors.GOLD]: "#FFD700",

  [LegendColors.YELLOW]: "yellow",
  [LegendColors.TURQOUISE]: "#40E0D0",
};

export const FEATURES_COLOR_OPTIONS: LegendColors[] = [
  LegendColors.BLUE,
  LegendColors.MINT_GREEN,
  LegendColors.ORANGE,
];

export const SELECTED_FEATURES_COLOR_OPTIONS: LegendColors[] = [
  LegendColors.DARK_BLUE,
  LegendColors.DARK_GREEN,
  LegendColors.DARK_PLUM,
];

export const CIRCLE_COLOR_OPTIONS: LegendColors[] = [
  LegendColors.BRIGHT_RED,
  LegendColors.GOLD,
  LegendColors.TURQOUISE,
  LegendColors.YELLOW,
];
