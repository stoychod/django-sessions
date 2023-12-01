import { useRouteError } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack gap={3} className="h-100  justify-content-center align-items-center">
      <h1 className="fw-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-body-secondary">
        <i>{error.statusText || error.message}</i>
      </p>
    </Stack>
  );
}
