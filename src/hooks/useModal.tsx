import {useState} from 'react';
import ModalLayout from '../components/overlays/modal/ModalLayout';

type UseModalReturnValue = {
  renderModal: () => React.ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setModalBgDark: React.Dispatch<React.SetStateAction<boolean>>;
  setModalCloseOnBgPress: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  activateBgDark: () => void;
  deactivateBgDark: () => void;
};

const useModal = (): UseModalReturnValue => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalBgDark, setModalBgDark] = useState(true);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalCloseOnBgPress, setModalCloseOnBgPress] = useState(false);

  return {
    renderModal: () => modalOpened && <ModalLayout>{modalContent}</ModalLayout>,
    setModalContent,
    setModalBgDark,
    setModalCloseOnBgPress,
    openModal: () => {
      setModalOpened(true);
    },
    closeModal: () => {
      setModalOpened(false);
    },
    activateBgDark: () => {
      setModalBgDark(true);
    },
    deactivateBgDark: () => {
      setModalBgDark(false);
    },
  };
};

export default useModal;
