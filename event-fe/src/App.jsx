import { useEffect, useState } from 'react'

import RegisterUser from "./components/Register";
import Login from "./components/Login.jsx";
import ListEvents from "./components/ListEvents.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import EventUpdate from "./components/EventUpdate.jsx";


function App() {
  return (
    <>
      <Header />
      <Login />
      <RegisterUser />
      <ListEvents />
      <CreateEvent />
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






