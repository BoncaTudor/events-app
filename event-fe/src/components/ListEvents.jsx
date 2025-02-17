import {useEffect, useState} from "react";
import axios from "axios";

export default function ListEvents(){
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);
  return (<div>
    <h3>Upcoming Events</h3>
    <ul>
      {events.map((event, index)=>(
        <li key={index}>
          {event.title} {event.date} {event.description} <br />participants {event.participant_count}
          </li>
      ))}
    </ul>
  </div>)
}