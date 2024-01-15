import { Fab } from "@mui/material";
import { CSSProperties } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLegendConfig } from "../../../hooks/useLegendConfig";

export default function FabSettings({
  handleToggle,
}: {
  handleToggle: () => void;
}) {
  const { selectedFeaturesColor } = useLegendConfig();
  return (
    <Fab
      onClick={handleToggle}
      style={{ ...STYLES.container, backgroundColor: "white" }}
      aria-label="open config drawer"
    >
      <SettingsIcon style={{ color: selectedFeaturesColor }} />
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
  },
};
