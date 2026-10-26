import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { toast } from "react-toastify";

const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

function AdminNavbar() {
  const{user,setUser}=useContext(AuthContext)
  const handleLogOut=async()=>{
    try {
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.log(error);
      toast.error("unable to logout")
      
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin/dashboard">
          Admin Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNav"
          aria-controls="adminNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {
                user&& <li className="nav-link">
                  <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                      Welcome {user.name}
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><button onClick={handleLogOut} class="dropdown-item text-danger" href="#">logout</button></li>
                    </ul>
                  </div>
                </li>
              }
              <NavLink className={navClass} to="/admin/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled">Users</span>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled">Reports</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Back to Site
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
