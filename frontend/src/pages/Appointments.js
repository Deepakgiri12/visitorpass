import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Appointments() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get(
  "http://localhost:5000/api/appointments",
  {
    headers: {
      Authorization:
        "Bearer " +
        localStorage.getItem("token"),
    }
  }
)
  .then(res => setData(res.data));

  }, []);

  return (
    <div>

      <Navbar />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div>

          <h2>Appointments</h2>

          {data.map(a => (
            <div key={a._id}>
              {a.visitorName} - {a.status}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}