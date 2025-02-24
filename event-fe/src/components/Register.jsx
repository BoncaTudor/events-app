import { useState } from "react";
import axios from "axios";
import { custom_button } from "./tailwind_constants.js";

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { email, password };
    console.log(newUser);
    await axios.post("http://127.0.0.1:8000/api/events/register/", newUser);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h3>User Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={custom_button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
