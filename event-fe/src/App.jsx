import { useEffect, useState } from 'react';
import CustomModal from './components/CustomModal.jsx';
import RegisterUser from './components/Register';
import ListEvents from './components/ListEvents.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EventUpdate from './components/EventUpdate.jsx';
import LoginButton from './components/Login.jsx';
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
    <header className='border border-stone-50 bg-stone-100 text-center text-stone-700'>
      <h1 className='text-5xl font-semibold hover:text-yellow-500'>
        Event Tracker
      </h1>
      <button className={custom_button} onClick={() => handleClick('login')}>
        Login
      </button>
      {isOpen && modalType === 'login' && (
        <CustomModal
          isOpenModal={isOpen}
          closeModal={closeModal}
          modalName={'LoginModal'}
          title={'Login'}
        >
          {<LoginButton />}
        </CustomModal>
      )}

      <button className={custom_button} onClick={() => handleClick('register')}>
        Register
      </button>
      {isOpen && modalType === 'register' && (
        <CustomModal
          isOpenModal={isOpen}
          closeModal={closeModal}
          modalName={'RegisterModal'}
          title={'Register'}
        >
          {<RegisterUser />}
        </CustomModal>
      )}
    </header>
  );
}
