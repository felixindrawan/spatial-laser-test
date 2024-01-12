import { Typography, Icon, Grid, Tooltip } from "@mui/material";
import { CSSProperties } from "react";

export default function MenuCardHeader({
  toggleMinimized,
}: {
  toggleMinimized: () => void;
}) {
  return (
    <Grid container>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        marginBottom={1}
        justifyContent={"flex-end"}
      >
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
      <Grid item xs={12}>
        <Typography variant="h5">Demographic Harvesting</Typography>
      </Grid>
      <Typography>by Felix Indrawan</Typography>
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
