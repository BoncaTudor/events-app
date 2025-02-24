import { useState } from 'react';
import axios from 'axios';
import { custom_button } from './tailwind_constants.js';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { email, password };
    console.log(newUser);
    await axios.post('http://127.0.0.1:8000/api/events/register/', newUser);
    setEmail('');
    setPassword('');
  };

  return (
    <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-1'>
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='box-border w-full rounded border border-gray-300 p-1'
        />
        <label>Password:</label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='box-border w-full rounded border border-gray-300 p-1'
        />
      </div>
      <button className={custom_button} type='submit'>
        Sign Up
      </button>
    </form>
  );
}
