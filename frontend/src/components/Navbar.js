import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();
    window.location = "/login";

  };

  return (

    <div className="navbar">

      <h2>Visitor Pass System</h2>

      <div>

        <Link to="/">Dashboard</Link>
        {" | "}
        <Link to="/visitors">Visitors</Link>
        {" | "}
        <Link to="/appointments">Appointments</Link>
        {" | "}
        <Link to="/passes">Passes</Link>
        {" | "}
        <Link to="/logs">Logs</Link>

        {" | "} Role: {role}

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  );
}