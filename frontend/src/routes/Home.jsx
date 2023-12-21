import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <Container className="flex-grow-0">
      <Container className="mt-5 p-5 bg-light">
        <h1>Welcome to Session Auth</h1>
        <p className="lead">
          This is a React and Django application with session authentication and
          CSRF token
        </p>
        <hr className="my-4" />
        <p>Click the button below to sign in</p>
        <Button
          variant="primary"
          // @ts-ignore
          as={Link}
          to={"/auth/login"}
        >
          Sign in
        </Button>
      </Container>
    </Container>
  );
}
