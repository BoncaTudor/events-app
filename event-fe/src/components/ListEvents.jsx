import { useEffect, useState } from "react";
import axios from "axios";

export default function ListEvents( {eventUp}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, [eventUp]);
  
  return (
    <div className="flex flex-col items-center my-100">
      <h2 className="text-center font-bold">Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} {event.date} {event.description} <br />
            participants {event.participant_count}
          </li>
        ))}
      </ul>
    </div>
  );
}
