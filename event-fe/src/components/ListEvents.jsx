import { useEffect, useState } from 'react';
import axios from 'axios';
import EventUpdate from './EventUpdate';
import { custom_button } from './tailwind_constants';

export default function ListEvents({
  eventUp,
  page,
  handleShowNextButton,
  handleShowPreviousButton,
}) {
  const [events, setEvents] = useState([]);
  const [showEventUpdate, setShowEventUpdate] = useState(false);
  const [index, setIndex] = useState();


  function handleEventUpdate( index ) {
    setShowEventUpdate((prevState) => !prevState);
    // setIndex(index);
    console.log("BAAAAAAAAAAAAA")
    console.log(index)
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/?page=${page}`)
      .then((response) => {
        setEvents(response.data.results);
        if (response.data.next === null) {
          handleShowNextButton(false);
        } else {
          handleShowNextButton(true);
        }
        if (response.data.previous === null) {
          handleShowPreviousButton(false);
        } else {
          handleShowPreviousButton(true);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the events!', error);
      });
  }, [page, eventUp]);

  return (
    <div className='my-100 flex flex-col items-center'>
      <h2 className='text-center font-bold p-5 '>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li
            className='relative m-2 w-80 rounded-lg border border-fuchsia-500 p-5 shadow-lg'
            key={index}
          >
            <div className='flex justify-between'>
              <span className='font-bold'>{event.title}</span>
              <span className='m-2 text-sm text-gray-500'>{event.date}</span>
            </div>
            <div className='text-center'>
              <h3 className='font-bold'>Event Details</h3>
              <span>{event.description}</span>
            </div>
            <div className='group relative mt-2 text-center text-sm'>
              <p>Participants: {event.participant_count}</p>
              <button
                className={`${custom_button} absolute bottom-[-5px] right-[-10px]`} onClick={handleEventUpdate}
              >
                Edit
              </button>
              <p
                className='absolute bottom-10 right-0 hidden translate-x-1/2 bg-gray-200 p-1 opacity-50 group-hover:block'
              >
                Edit Event
              </p>
            </div>
          </li>
        ))}
      </ul>
      {showEventUpdate && (
        <div className=' absolute right-72 top-1/2 transform translate-x-1/2 -translate-y-1/2 px-7 py-10'>
          <EventUpdate eventId={index} />
        </div>)}
    </div>
  );
}
