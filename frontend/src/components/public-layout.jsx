import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PublicLayout;
