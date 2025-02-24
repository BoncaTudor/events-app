import { useEffect, useState } from 'react';
import CustomModal from './components/CustomModal.jsx';
import SignUp from './components/SignUp.jsx';
import ListEvents from './components/ListEvents.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EventUpdate from './components/EventUpdate.jsx';
import SignIn from './components/SignIn.jsx';
import { custom_button } from './components/tailwind_constants.js';

function App() {
  return (
    <div>
      <Header />
      <ListEvents />
      <CreateEvent />
      <EventUpdate />
    </div>
  );
}
export default App;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const [modalType, setModalType] = useState(null);

  const handleClick = (type) => {
    setIsOpen(true);
    setModalType(type);
  };

  return (
    <header className='flex items-center justify-center border border-stone-50 bg-stone-100 px-4 text-center text-stone-700'>
      <h1 className='mx-auto text-5xl font-semibold hover:text-yellow-500'>
        Event Tracker
      </h1>
      <div className='ml-auto'>
        <button className={custom_button} onClick={() => handleClick('signIn')}>
          Sign In
        </button>
        {isOpen && modalType === 'signIn' && (
          <CustomModal
            isOpenModal={isOpen}
            closeModal={closeModal}
            modalName={'SignInModal'}
            title={'Sign In to Event Tracker'}
          >
            {<SignIn />}
          </CustomModal>
        )}

        <button
          className={custom_button}
          onClick={() => handleClick('sign up')}
        >
          Sign Up
        </button>
        {isOpen && modalType === 'sign up' && (
          <CustomModal
            isOpenModal={isOpen}
            closeModal={closeModal}
            modalName={'SignUpModal'}
            title={'Sign Up'}
          >
            {<SignUp />}
          </CustomModal>
        )}
      </div>
    </header>
  );
}
