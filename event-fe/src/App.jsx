import { useEffect, useState } from 'react'
import axios from "axios";

function App() {

  return (
    <>
      <Header />
      <Login />
      <RegisterUser />
      <ListEvents />
      <CreateEventView />
      <EventUpdate />
    </>
  )
}
export default App


function Header(){
  return (
    <div className="header">
    <h1>Events UI</h1>
    </div>
  )
}

function Login(){
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

function ListEvents(){
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

function CreateEventView(){
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

function RegisterUser(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const newUser = { email, password }

    await axios.post("http://127.0.0.1:8000/api/events/register/", newUser)
    setEmail("");
    setPassword("");
  }

  return(
    <div>
       <h3>User Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        
        <div>
          <label>password:</label>
          <input  type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit">Register</button>
      </form>
      
    </div>
  )

}

function EventUpdate(){
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