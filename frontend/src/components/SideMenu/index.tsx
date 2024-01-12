import { Card, CardContent, Divider } from "@mui/material";
import { CSSProperties, useCallback, useState } from "react";
import UserConfig from "./UserConfig";
import Draggable from "react-draggable";
import MenuCardHeader from "./MenuCardHeader";

export default function SideMenu() {
  const [minimized, setMinimized] = useState(false);
  const handleMinimizedToggle = useCallback(() => {
    setMinimized(!minimized);
  }, [minimized]);
  return (
    <Draggable bounds="body" handle=".handle">
      <Card style={STYLES.container}>
        <CardContent style={STYLES.content}>
          <MenuCardHeader toggleMinimized={handleMinimizedToggle} />
          {!minimized && (
            <>
              <Divider />
              <UserConfig />
            </>
          )}
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
