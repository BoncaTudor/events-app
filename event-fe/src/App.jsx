import { useState } from 'react';

import ListEvents from './components/ListEvents.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import Header from './components/Header.jsx';
import { custom_button } from './components/tailwind_constants.js';

function App() {
  const [eventUp, setEventUp] = useState(false);
  const [page, setPage] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  function handleNextPage() {
    setPage((prevState) => prevState + 1);
  }
  function handlePreviousPage() {
    setPage((prevState) => prevState - 1);
  }

  function handleShowNextButton(value) {
    setShowNextButton(value);
  }
  function handleShowPreviousButton(value) {
    setShowPreviousButton(value);
  }

  function handleEventUp() {
    setEventUp((prevState) => !prevState);
  }

  return (
    <div className='font-serif'>
      <Header />
      <div className='relative flex flex-col items-center px-4'>
        <button
          className={`${showNextButton ? custom_button : 'invisible opacity-0'} absolute right-40 top-0 w-auto max-w-fit`}
          onClick={handleNextPage}
        >
          Next Events
        </button>
        <ListEvents
          eventUp={eventUp}
          page={page}
          handleShowNextButton={handleShowNextButton}
          handleShowPreviousButton={handleShowPreviousButton}
        />
        <button
          className={`${showPreviousButton ? custom_button : 'invisible opacity-0'} absolute left-40 top-0 w-auto max-w-fit`}
          onClick={handlePreviousPage}
        >
          Previous Events
        </button>
      </div>
      <CreateEvent handleEventUp={handleEventUp} />
    </div>
  );
}
export default App;
