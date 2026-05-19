import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Logs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/api/check/logs", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => setLogs(res.data));

  }, []);

  return (
    <div>

      <Navbar />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div>

          <h2>Logs</h2>

          {logs.map(l => (
            <div key={l._id}>
              {l.visitorName} - {l.status}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}