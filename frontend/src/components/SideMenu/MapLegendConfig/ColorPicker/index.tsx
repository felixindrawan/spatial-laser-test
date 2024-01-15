import { Tooltip, Typography, Button } from "@mui/material";
import { LEGEND_COLORS, LegendColors } from "../../../../consts/LegendColor";
import { CSSProperties } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function ColorPicker({
  title,
  currentColor,
  colorOptions,
  handleColorChange,
}: {
  title: string;
  currentColor?: string;
  colorOptions: string[];
  handleColorChange: (newColor: LegendColors) => void;
}) {
  return (
    <div style={STYLES.container}>
      <Typography>
        <b>{title}</b>
      </Typography>
      <div style={STYLES.colorPickerContainer}>
        {colorOptions.map((col) => (
          <Tooltip title={col} placement="top" key={col}>
            <Button
              variant="contained"
              disabled={currentColor === LEGEND_COLORS[col as LegendColors]}
              style={{
                ...STYLES.colorBox,
                backgroundColor: LEGEND_COLORS[col as LegendColors],
              }}
              onClick={() => handleColorChange(col as LegendColors)}
            >
              {currentColor === LEGEND_COLORS[col as LegendColors] && (
                <CheckCircleIcon style={{ color: "black" }} fontSize="small" />
              )}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  colorBox: {
    cursor: "pointer",
    height: 32,
    border: "2px solid rgba(0,0,0,0.2)",
  },
  colorPickerContainer: {
    display: "flex",
    gap: 10,
  },
};
