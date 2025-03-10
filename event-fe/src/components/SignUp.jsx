import { useState, useEffect } from 'react';
import axios from 'axios';
import { custom_button } from './tailwind_constants.js';

export default function SignUp({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { email, password, firstName, lastName };
    console.log(newUser);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/events/register/',
        newUser,
      );
      setError(200);
      console.log(response);
    } catch (err) {
      setError(err.response?.status);
      console.log(err);
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className='flex flex-col text-center'>
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
          <label>First Name:</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className='box-border w-full rounded border border-gray-300 p-1'
          />
          <label>Last Name:</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className='box-border w-full rounded border border-gray-300 p-1'
          />
        </div>
        <button className={custom_button} type='submit'>
          Sign Up
        </button>
      </form>
      <HandleSingUp error={error} closeModal={closeModal} />
    </div>
  );
}

function HandleSingUp({ error, closeModal }) {
  useEffect(() => {
    if (error === 200) {
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  }, [error, closeModal]);

  if (error === 200) {
    return <p>Account created! 😎</p>;
  } else if (error === 400) {
    return <p>Account Already Exists 🥸</p>;
  } else if (error !== null) {
    return <p>Something went wrong 🤯</p>;
  }
  return null;
}
