import { CSSProperties } from "react";
import { IconButton, Tooltip, Typography, Card, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function MapDataBoxes({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isExpanded, setExpanded] = useLocalStorage(
    `${title}-visibility`,
    true
  );
  const toggleExpandInfo = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Card style={MAP_DATA_STYLES.container} variant="outlined">
      <div style={MAP_DATA_STYLES.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            <b>{title}</b>
          </Typography>
          <Tooltip title={isExpanded ? "Hide" : "Show"}>
            <IconButton
              onClick={toggleExpandInfo}
              style={{ width: 24, height: 24 }}
              aria-label="Show/hide data"
            >
              {isExpanded ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        </div>
        {isExpanded && (
          <>
            <Divider />
            {children}
          </>
        )}
      </div>
    </Card>
  );
}

const MAP_DATA_STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    width: "100%",
    border: "2px solid rgba(0,0,0,0.2)",
  },
  content: {
    display: "flex",
    gap: 5,
    flexDirection: "column",
    padding: 10,
  },
};
