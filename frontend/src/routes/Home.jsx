import Container from "react-bootstrap/Container";

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
        <p>
          The app implements a full CRUD functionality. You can create, update
          or delete an account.
        </p>
      </Container>
    </Container>
  );
}
