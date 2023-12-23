import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <Stack gap={3} className="h-100  justify-content-center align-items-center">
      <h1 className="fw-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-body-secondary">
        <i>{errorMessage}</i>
      </p>
    </Stack>
  );
}
