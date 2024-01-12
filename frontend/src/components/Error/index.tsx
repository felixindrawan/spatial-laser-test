import { Alert, AlertTitle } from "@mui/material";

export default function ErrorAlert({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <Alert severity="error">
      <AlertTitle>{title ?? "Error"}</AlertTitle>
      {message}
    </Alert>
  );
}
