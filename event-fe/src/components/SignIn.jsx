import { useState, useEffect } from 'react';
import axios from 'axios';
import { custom_button } from './tailwind_constants.js';

export default function SignIn({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/events/login/',
        { email, password },
      );
      localStorage.setItem('access_token', response.data.token.access);
      localStorage.setItem('refresh_token', response.data.token.refresh);
      setError(200);
    } catch (err) {
      setError(err.response?.status);
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col text-center'>
      <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={custom_button} type='submit'>
          Sign In
        </button>
      </form>
      <HandleLoginMessage error={error} closeModal={closeModal} />
    </div>
  );
}

function HandleLoginMessage({ error, closeModal }) {
  useEffect(() => {
    if (error === 200) {
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  }, [error, closeModal]);

  if (error === 200) {
    return <p>Logged in! 😎</p>;
  } else if (error === 400) {
    return <p> Invalid Credentials 🥸</p>;
  } else if (error === 404) {
    return <p> User not found 🥲</p>;
  } else if (error !== null) {
    return <p> Error Occured 🤦‍♂️</p>;
  }
  return null;
}
