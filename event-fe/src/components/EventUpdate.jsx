import {useState} from "react";
import axios from "axios";

export default function EventUpdate(){

  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const updateEvent = {};

    if (title) {
      updateEvent.title = title;
    }
    if (date) {
      updateEvent.date = date;
    }
    if (description) {
      updateEvent.description = description;
    }

    const updateUrl = `http://127.0.0.1:8000/api/events/${eventId}/update/`;
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("Not logged in")
      return;
    }

    await axios.patch(updateUrl, updateEvent, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setEventId("")
    setTitle("");
    setDate("");
    setDescription("");
  }

  return(
      <div>
        <h3>EventUpdate</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>event_id</label>
            <input type={"number"} value={eventId} onChange={(e) => setEventId(e.target.value)} required/>
          </div>
          <div>
            <label>Event Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div>
            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div>
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>
          <button type={"submit"}>EventUpdate</button>
        </form>
      </div>
  )
}