import { Card, Divider, Popover, Typography } from "@mui/material";
import { CSSProperties, useState } from "react";
import { useLegendConfig } from "../../hooks/useLegendConfig";
import {
  CIRCLE_COLOR_OPTIONS,
  FEATURES_COLOR_OPTIONS,
  LEGEND_COLORS,
  LegendColors,
  SELECTED_FEATURES_COLOR_OPTIONS,
} from "../../consts/LegendColor";

export default function MapLegend() {
  const {
    featuresColor,
    selectedFeaturesColor,
    circleColor,
    handleCircleColorChange,
    handleFeaturesColorChange,
    handleSelectedFeaturesColorChange,
  } = useLegendConfig();
  return (
    <Card style={STYLES.container} variant="outlined">
      <div style={STYLES.content}>
        <Typography>
          <b>Map Legend</b>
        </Typography>
        <Divider />
        <ColorAndTextGrid
          color={circleColor as string}
          text="Circle"
          colorOptions={CIRCLE_COLOR_OPTIONS}
          handleColorChange={handleCircleColorChange}
        />
        <ColorAndTextGrid
          color={featuresColor as string}
          text="Features"
          colorOptions={FEATURES_COLOR_OPTIONS}
          handleColorChange={handleFeaturesColorChange}
        />
        <ColorAndTextGrid
          color={selectedFeaturesColor as string}
          text="Selected Features"
          colorOptions={SELECTED_FEATURES_COLOR_OPTIONS}
          handleColorChange={handleSelectedFeaturesColorChange}
        />
      </div>
    </Card>
  );
}

function ColorAndTextGrid({
  color,
  text,
  colorOptions,
  handleColorChange,
}: {
  color: string;
  text: string;
  colorOptions: string[];
  handleColorChange: (newColor: LegendColors) => void;
}) {
  // https://mui.com/material-ui/react-popover/
  const [anchorEl, setAnchorEl] = useState(null);
  const handleColorboxClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "choose-color-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <div
          style={{ ...STYLES.colorBox, backgroundColor: color }}
          onClick={handleColorboxClick}
        />
        <Typography>{text}</Typography>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div style={STYLES.colorPickerContainer}>
          <Typography>
            <b>Choose color:</b>
          </Typography>
          <div style={{ display: "flex", gap: 5 }}>
            {colorOptions.map((col) => (
              <div
                key={col}
                style={{
                  ...STYLES.colorBox,
                  backgroundColor: LEGEND_COLORS[col as LegendColors],
                }}
                onClick={() => handleColorChange(col as LegendColors)}
              />
            ))}
          </div>
        </div>
      </Popover>
    </>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 1000,
    border: "2px solid rgba(0,0,0,0.2)",
  },
  content: {
    display: "flex",
    gap: 5,
    flexDirection: "column",
    padding: 10,
  },
  colorBox: {
    cursor: "pointer",
    width: 24,
    height: 24,
    border: "2px solid rgba(0,0,0,0.2)",
  },
  colorPickerContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
};
