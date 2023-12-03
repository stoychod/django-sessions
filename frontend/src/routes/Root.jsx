import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

export default function Root() {
  return (
    <>
      <header>
        <nav>
          <AppBar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
