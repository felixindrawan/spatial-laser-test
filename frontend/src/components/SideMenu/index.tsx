import {
  Divider,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CSSProperties } from "react";
import UserConfig from "./UserConfig";
import { DRAWER_BACKGROUND_COLOR, DRAWER_WIDTH } from "../../consts/MapConfigs";
import { MEDIUM_SCREEN_AND_ABOVE } from "../../consts/Breakpoints";
import CloseIcon from "@mui/icons-material/Close";

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SideMenuHeader />
          <CloseDrawerButton handleClose={handleToggle} />
        </div>
        <Divider />
        <UserConfig />
      </div>
    </Drawer>
  );
}

const SideMenuHeader = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Typography variant="h5">
        <b>Demographic Harvesting</b>
      </Typography>
      <Typography>by Felix Indrawan</Typography>
    </div>
  );
};

const CloseDrawerButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Tooltip title="Close drawer" placement="bottom" onClick={handleClose}>
      <IconButton aria-label="close drawer" style={{ width: 32, height: 32 }}>
        <CloseIcon style={{ color: "black" }} />
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
    gap: 20,
    padding: 25,
  },
};
