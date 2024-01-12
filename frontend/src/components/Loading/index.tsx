import { Box, CircularProgress } from "@mui/material";

export default function Loading({
  fullScreen = false,
}: {
  fullScreen?: boolean;
}) {
  if (fullScreen) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
