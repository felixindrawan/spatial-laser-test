import {
  Divider,
  Drawer,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { CSSProperties } from "react";
import UserConfig from "./UserConfig";
import CalculationResults from "./CalculationResults";
import { DRAWER_BACKGROUND_COLOR, DRAWER_WIDTH } from "../../consts/MapConfigs";
import { MEDIUM_SCREEN_AND_ABOVE } from "../../consts/Breakpoints";

export default function SideMenu({
  open,
  handleToggle,
}: {
  open: boolean;
  handleToggle: () => void;
}) {
  const isMobile = !useMediaQuery(MEDIUM_SCREEN_AND_ABOVE);
  return (
    <Drawer
      open={open}
      onClose={handleToggle}
      anchor="right"
      variant="persistent"
      sx={{
        // https://mui.com/material-ui/react-drawer/#system-PersistentDrawerLeft.tsx
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          backgroundColor: DRAWER_BACKGROUND_COLOR,
          width: isMobile ? "100%" : DRAWER_WIDTH,
        },
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
      <IconButton size="small">
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
    margin: 4,
  },
};
