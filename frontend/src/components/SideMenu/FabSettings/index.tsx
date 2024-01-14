import { Fab } from "@mui/material";
import { CSSProperties } from "react";
import { CONFIG_BACKGROUND_COLOR } from "../../../consts/MapConfigs";

export default function FabSettings({
  handleToggle,
}: {
  handleToggle: () => void;
}) {
  return (
    <Fab onClick={handleToggle} style={STYLES.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3019/3019014.png"
        alt="Settings Icon"
        style={STYLES.iconImg}
      />
    </Fab>
  );
}

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: CONFIG_BACKGROUND_COLOR,
  },
  iconImg: {
    height: "24px",
    pointerEvents: "none",
  },
};
