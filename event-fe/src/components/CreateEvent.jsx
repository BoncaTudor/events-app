import {useState} from "react";
import axios from "axios";

export default function CreateEvent(){
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const newEvent = { title, date, description }

    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("Not logged in")
      return;
    }

    await axios.post("http://127.0.0.1:8000/api/events/create/", newEvent,
      {
        headers:{Authorization: `Bearer ${token}`}
      },
    );


    setTitle("");
    setDate("");
    setDescription("");

  }
  return (
    <div>
      <h3>Create New Event</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>

        <div>
          <label>Description:</label>
          <input  type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
        </div>

        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
        </div>

        <button type="submit">Create Event</button>
      </form>
    </div>
  )
}
