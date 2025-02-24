import Modal from 'react-modal';
export default function CustomModal({
  isOpenModal,
  closeModal,
  modalName,
  title,
  children,
}) {
  return (
    <Modal
      isOpen={isOpenModal}
      contentLabel={modalName}
      ariaHideApp={false}
      className='relative mx-auto w-96 -translate-y-60 transform rounded-lg bg-stone-100 p-6 shadow-lg'
      overlayClassName='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
    >
      <div className='flex justify-center'>
        <h2 className='pb-4'>{title ?? null}</h2>
        <button
          className='text-fuchsia absolute right-0 top-0 m-1 rounded-full border border-fuchsia-500 px-2 py-1 text-sm font-semibold hover:bg-teal-200'
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <div>{children}</div>
    </Modal>
  );
}
