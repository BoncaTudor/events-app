import { useState } from 'react';
import axios from 'axios';
import { custom_button } from './tailwind_constants';

export default function EventUpdate({ eventId }) {

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
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
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.log('Not logged in');
      return;
    }

    await axios.patch(updateUrl, updateEvent, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <div className='flex flex-col items-center rounded-full border border-fuchsia-500 px-12 py-8 shadow-lg'>
      <h3 className='pb-6 font-bold'>Event Update</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32 text-right'>Event Title </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32 text-right'>Description </label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32 text-right'>Date </label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <button className={custom_button} type='submit'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
