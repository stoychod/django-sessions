import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AccountMenu from "./AccountMenu";
import { useCheckAuthenticatedQuery } from "../api/apiSlice";

export default function AppBar() {
  const { data } = useCheckAuthenticatedQuery();
  const isAuthenticated = data ? data.isAuthenticated : false;

  return (
    <Container fluid className="bg-body-tertiary py-2 fs-3">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand as={NavLink} to="/">
          Session Auth
        </Navbar.Brand>
        {isAuthenticated ? (
          <AccountMenu />
        ) : (
          <Nav.Link as={NavLink} to={"/auth/login"}>
            Sign in
          </Nav.Link>
        )}
      </Container>
    </Container>
  );
}
