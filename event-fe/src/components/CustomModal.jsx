import { useState } from "react";
import Modal from "react-modal";
import { custom_button } from "./tailwind_constants.js";
export default function CustomModal({
  isOpenModal,
  closeModal,
  modalName,
  title,
  children,
}) {
  return (
    <div className="custom-modal">
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        contentLabel={modalName}
        ariaHideApp={false}
      >
        <h2>{title}</h2>
        {console.log("wads")}
        <div>{children}</div>
        <button className={custom_button} onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}
