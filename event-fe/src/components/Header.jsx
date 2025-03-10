import {useState } from 'react';
import CustomModal from './CustomModal.jsx';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import { custom_button } from './tailwind_constants.js';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
  
    const closeModal = () => {
      setIsOpen(false);
    };
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
              {<SignIn closeModal={closeModal} />}
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
              {<SignUp closeModal={closeModal} />}
            </CustomModal>
          )}
        </div>
      </header>
    );
  }
  