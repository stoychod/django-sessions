import { useNavigate, Link as RouterLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavLink from "react-bootstrap/NavLink";
import Cookies from "js-cookie";
import { MdAccountCircle } from "react-icons/md";
import { useLogoutUserMutation } from "../api/apiSlice";

export default function AccountMenu() {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const csrftoken = Cookies.get("csrftoken");
  if (!csrftoken) {
    throw new Error("No csrf token found!");
  }

  async function handleLogout() {
    try {
      await logoutUser(csrftoken).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dropdown drop="down-centered" className="d-flex">
      <Dropdown.Toggle
        as={NavLink}
        id="dropdown-basic"
        className="d-flex align-items-center"
      >
        <MdAccountCircle />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={RouterLink} to="/dashboard">
          Account
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
