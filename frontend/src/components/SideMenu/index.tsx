import {
  Card,
  CardContent,
  Divider,
  Typography,
  Icon,
  Grid,
} from "@mui/material";
import { CSSProperties } from "react";
import UserConfig from "./UserConfig";
import CalculationResults from "./CalculationResults";
import Draggable from "react-draggable";

export default function SideMenu() {
  return (
    <Draggable bounds="body" handle=".handle">
      <Card style={STYLES.container}>
        <CardContent style={STYLES.content}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h5">Demographic Harvesting</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Icon className="handle" style={{ cursor: "pointer" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2926/2926236.png"
                  alt="drag-icon"
                  style={{
                    height: "100%",
                    pointerEvents: "none",
                  }}
                />
              </Icon>
            </Grid>
            <Typography>by Felix Indrawan</Typography>
          </Grid>

          <Divider />
          <UserConfig />
          <Divider />
          <CalculationResults />
        </CardContent>
      </Card>
    </Draggable>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    position: "absolute",
    top: 100,
    right: 100,
    zIndex: 1000,
    width: "24rem",
    backgroundColor: "rgba(198, 222, 241)",
    borderRadius: 10,
    padding: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
};
