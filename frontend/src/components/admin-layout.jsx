import { Outlet } from "react-router-dom";
import AdminNavbar from "./admin-navbar";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
