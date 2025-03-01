import { useState } from 'react';
import axios from 'axios';
import { custom_button } from './tailwind_constants.js';

export default function SignIn() {
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

      setError(null);
    } catch (error) {
      console.error('fail', error);

      if (error.response?.status === 404) {
        console.log('User not found');
        setError({ status: 404, message: 'User Does Not Exist!' });
      } else {
        setError({
          status: error.response?.status,
          message: error.response?.data,
        });
      }
    }
  };

  return (
    <>
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
      {error ? (
        error?.status === 404 && <p className='text-center'>{error.message}</p>
      ) : (
        <p className='text-center'>Logged In!</p>
      )}
    </>
  );
}
