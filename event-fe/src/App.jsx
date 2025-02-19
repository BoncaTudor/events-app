import { useEffect, useState } from 'react'
import CustomModal from "./components/CustomModal.jsx";
import RegisterUser from "./components/Register";
import ListEvents from "./components/ListEvents.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import EventUpdate from "./components/EventUpdate.jsx";
import LoginButton from "./components/Login.jsx";


function App() {
  return (
    <>
      <Header />
      <ListEvents />
      <CreateEvent />
      <EventUpdate />
    </>
  )
}
export default App


function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
      setIsOpen(false)
    }

    const [modalType, setModalType] = useState(null)

    const handleClick = (type) => {
        setIsOpen(true)
        setModalType(type)
    }

  return (
      <div className="header">
          <h1>Events UI</h1>
          <button className="login-btn" onClick={() => handleClick("login")}>Login</button>
          {isOpen && modalType === "login" && <CustomModal isOpenModal={isOpen}
                                  closeModal={closeModal}
                                  modalName={"LoginModal"}
                                  title={"Login"}>
              {<LoginButton />}
          </CustomModal>}

          <button className="register-btn" onClick={() => handleClick("register")}>Register</button>
          {isOpen && modalType === "register" && <CustomModal isOpenModal={isOpen}
                                  closeModal={closeModal}
                                  modalName={"RegisterModal"}
                                  title={"Register"}>
              {<RegisterUser />}
          </CustomModal>}
      </div>
  )
}






