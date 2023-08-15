import React, {FC, useState} from 'react';
import Modal from '../components/modals/Modal';

const useModal = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactElement>(<></>);
  const [modalZIndex, setModalZIndex] = useState(5);

  return {
    Modal: modalOpened
      ? () => <Modal zIndex={modalZIndex}>{modalContent}</Modal>
      : () => null,
    openModal: () => setModalOpened(true),
    closeModal: () => setModalOpened(false),
    setModalContent,
    setModalZIndex,
  };
};

export default useModal;
