import { Icon, Grid, Tooltip } from "@mui/material";
import { CSSProperties } from "react";
import CalculationResults from "../CalculationResults";

export default function MenuCardHeader({
  toggleMinimized,
}: {
  toggleMinimized: () => void;
}) {
  return (
    <Grid container>
      <Grid item xs={9}>
        <CalculationResults />
      </Grid>
      <Grid item container xs={3} spacing={2}>
        <Grid item>
          <Tooltip
            title="Drag and move this window!"
            placement="top"
            style={STYLES.dragIconContainer}
          >
            <Icon className="handle" style={{ cursor: "pointer" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2926/2926236.png"
                alt="drag-icon"
                style={STYLES.iconImg}
              />
            </Icon>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            title="Minimize window"
            placement="top"
            onClick={toggleMinimized}
          >
            <Icon style={{ cursor: "pointer" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2989/2989876.png"
                alt="minimize-icon"
                style={STYLES.iconImg}
              />
            </Icon>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  dragIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  iconImg: {
    height: "100%",
    pointerEvents: "none",
  },
};
