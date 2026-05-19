import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../App.css";

export default function Visitors() {

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    purpose: ""
  });

  const [photo, setPhoto] = useState(null);

  const [search, setSearch] = useState("");


  // GET VISITORS
  const getVisitors = () => {

    axios.get(
      "http://localhost:5000/api/visitors",
      {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("token")
        }
      }
    )
      .then(res => setData(res.data));

  };


  useEffect(() => {
    getVisitors();
  }, []);


  // ADD VISITOR
  const addVisitor = async () => {

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("purpose", form.purpose);
    formData.append("photo", photo);

    await axios.post(
      "http://localhost:5000/api/visitors",
      formData,
      {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("token"),
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    getVisitors();

  };


  // FILTER
  const filtered = data.filter(v =>
    (v.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (v.phone || "").includes(search)
  );


  return (

    <div>

      <Navbar />

      <div className="layout">

        <Sidebar />

        <div className="main">

          <h2>Visitors</h2>


          {/* SEARCH */}

          <input
            className="search"
            placeholder="Search name / phone"
            value={search}
            onChange={e =>
              setSearch(e.target.value)
            }
          />


          {/* FORM */}

          <div className="form">

            <input
              placeholder="Name"
              onChange={e =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />

            <input
              placeholder="Phone"
              onChange={e =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />

            <input
              placeholder="Purpose"
              onChange={e =>
                setForm({
                  ...form,
                  purpose: e.target.value
                })
              }
            />

            <input
              type="file"
              onChange={e =>
                setPhoto(e.target.files[0])
              }
            />

            <button onClick={addVisitor}>
              Add Visitor
            </button>

          </div>


          {/* LIST */}

          {filtered.map(v => (

            <div
              key={v._id}
              className="visitor-card"
            >

              <p>
                {v.name} - {v.phone}
              </p>

              {v.photo && (

                <img
                  src={
                    "http://localhost:5000/uploads/" +
                    v.photo
                  }
                  alt="visitor"
                  width="120"
                />

              )}

            </div>

          ))}


        </div>

      </div>

    </div>

  );

}