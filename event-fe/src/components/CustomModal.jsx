import {useState} from "react";
import Modal from "react-modal";

export default function CustomModal({ isOpenModal, closeModal, modalName, title, children}){

    return (
    <div className="custom-modal">
        <Modal
        isOpen= {isOpenModal}
        onRequestClose={closeModal}
        contentLabel={modalName}
        ariaHideApp={false}
        >
            <h2>{title}</h2>
            {console.log("wads")}
            <div>{children}</div>
            <button className="modal-close-btn" onClick={closeModal}>Close</button>
        </Modal>
    </div>
  );
}