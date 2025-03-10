import {useState } from 'react';

import ListEvents from './components/ListEvents.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EventUpdate from './components/EventUpdate.jsx';
import Header from './components/Header.jsx';
function App() {

  const [eventUp, setEventUp] = useState(false);

  function handleEventUp(){
    console.log('handleEventUp');
    setEventUp(prevState => !prevState);
  }
  return (
    <div className='font-serif'>
      <Header />
      <ListEvents eventUp={eventUp}/>
      <CreateEvent handleEventUp={handleEventUp} />
      <EventUpdate />
    </div>
  );
}
export default App;

