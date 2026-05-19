import { useState } from "react";
import axios from "axios";

export default function VisitorForm() {
  const [form, setForm] = useState({ name: "", phone: "", purpose: "" });

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/visitors", form);
    console.log(res.data);
  };

  return (
    <div>
      <h2>Add Visitor</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
      <input placeholder="Purpose" onChange={e => setForm({...form, purpose: e.target.value})} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}