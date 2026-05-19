import { Link } from "react-router-dom";
import "../App.css";

export default function Sidebar() {

  return (

    <div className="sidebar">

      <h3>Menu</h3>

      <Link to="/">Dashboard</Link>
      <Link to="/visitors">Visitors</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/passes">Passes</Link>
      <Link to="/logs">Logs</Link>

    </div>

  );

}