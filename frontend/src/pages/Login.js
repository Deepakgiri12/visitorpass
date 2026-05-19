import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "role",
      res.data.user.role
    );

    window.location = "/";

  };

  return (
    <div>

      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={e =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        onChange={e =>
          setPassword(e.target.value)
        }
      />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}