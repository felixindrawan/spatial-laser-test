import { Divider, Drawer, IconButton, Tooltip } from "@mui/material";
import { CSSProperties } from "react";
import UserConfig from "./UserConfig";
import CalculationResults from "./CalculationResults";
import { CONFIG_BACKGROUND_COLOR } from "../../consts/MapConfigs";

export default function SideMenu({
  open,
  handleToggle,
}: {
  open: boolean;
  handleToggle: () => void;
}) {
  return (
    <Drawer
      open={open}
      onClose={handleToggle}
      anchor="right"
      PaperProps={{
        style: { backgroundColor: CONFIG_BACKGROUND_COLOR },
      }}
    >
      <div style={STYLES.container}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseDrawerButton handleClose={handleToggle} />
        </div>
        <CalculationResults />
        <Divider />
        <UserConfig />
      </div>
    </Drawer>
  );
}

const CloseDrawerButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Tooltip title="Close drawer" placement="bottom" onClick={handleClose}>
      <IconButton size="medium">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
          alt="close-icon"
          style={STYLES.iconImg}
        />
      </IconButton>
    </Tooltip>
  );
};

const STYLES: {
  [x: string]: CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 25,
  },
  iconImg: {
    height: 24,
    pointerEvents: "none",
    margin: 8,
  },
};
