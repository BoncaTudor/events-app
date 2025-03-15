import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListEvents({
  eventUp,
  page,
  handleShowNextButton,
  handleShowPreviousButton,
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/?page=${page}`)
      .then((response) => {
        console.log('response', response);
        setEvents(response.data.results);
        console.log('response.data.next', response.data.next);
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
      <h2 className='text-center font-bold'>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li
            className='m-2 w-64 rounded-lg border border-fuchsia-500 p-4'
            key={index}
          >
            <div className='flex justify-between'>
              <span className='font-bold'>{event.title}</span>
              <span className='m-2 text-sm text-gray-500'>{event.date}</span>
            </div>
            <div className='mt-2 text-center text-sm'>
              Participants: {event.participant_count}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
