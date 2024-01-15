import { Card, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { useUserConfig } from "../../hooks/useUserConfig";

export default function CurrentCoordinates() {
  const { currentPosition } = useUserConfig();
  if (!currentPosition?.lat || !currentPosition?.lng) return <></>;

  return (
    <Card style={STYLES.container} variant="outlined">
      <div style={STYLES.content}>
        <Typography>
          <b>Current Coordinates (Lat, Long)</b>
        </Typography>
        <Typography>
          {currentPosition?.lat}, {currentPosition?.lng}
        </Typography>
      </div>
    </Card>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    position: "absolute",
    top: 10,
    left: 50,
    zIndex: 1000,
    border: "2px solid rgba(0,0,0,0.2)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 6,
  },
};
