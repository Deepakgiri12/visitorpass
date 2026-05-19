import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin"
  });

  const register = async () => {

    await axios.post(
      "http://localhost:5000/api/auth/register",
      form
    );

    alert("User created");

  };

  return (
    <div>

      <h2>Register</h2>

      <input
        placeholder="name"
        onChange={e =>
          setForm({
            ...form,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="email"
        onChange={e =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="password"
        onChange={e =>
          setForm({
            ...form,
            password: e.target.value
          })
        }
      />

      <select
        onChange={e =>
          setForm({
            ...form,
            role: e.target.value
          })
        }
      >
        <option>admin</option>
        <option>security</option>
        <option>employee</option>
      </select>

      <button onClick={register}>
        Register
      </button>

    </div>
  );
}