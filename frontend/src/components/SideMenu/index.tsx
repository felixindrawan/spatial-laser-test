import {
  Card,
  CardContent,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
import { CSSProperties } from "react";
import UserConfig from "./UserConfig";
import CalculationResults from "./CalculationResults";
import Draggable from "react-draggable";

export default function SideMenu() {
  return (
    <Draggable bounds="body">
      <Card style={STYLES.container}>
        <CardContent style={STYLES.content}>
          <div>
            <Typography variant="h5">Demographic Harvesting</Typography>
            <Typography>by Felix Indrawan</Typography>
          </div>
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
