import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AccountMenu from "./AccountMenu";
import { useCheckAuthenticatedQuery } from "../api/apiSlice";

export default function AppBar() {
  const { data } = useCheckAuthenticatedQuery();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Session Auth
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            {data.isAuthenticated ? (
              <AccountMenu />
            ) : (
              <Nav.Link as={NavLink} to={"/auth/login"}>
                Sign in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
