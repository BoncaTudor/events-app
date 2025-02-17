import {useState} from "react";
import axios from "axios";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const response = await axios.post("http://127.0.0.1:8000/api/events/login/", { email, password});
      console.log(response.data.token.access)
      localStorage.setItem("access_token", response.data.token.access);
      localStorage.setItem("refresh_token", response.data.token.refresh);

    }catch(error) {
      console.error("fail", error)
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {!localStorage.getItem("access_token") ? null : <p>Logged in</p> }
    </div>
  );
}