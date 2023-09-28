import {useState} from 'react';
import ModalLayout from '../components/overlays/modal/ModalLayout';

type UseModalReturnValue = {
  renderModal: () => React.ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setModalBgDark: React.Dispatch<React.SetStateAction<boolean>>;
  setModalCloseOnBgPress: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  activateModalBgDark: () => void;
  deactivateModalBgDark: () => void;
};

const useModal = (): UseModalReturnValue => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalBgDark, setModalBgDark] = useState(true);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalCloseOnBgPress, setModalCloseOnBgPress] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const activateModalBgDark = () => {
    setModalBgDark(true);
  };

  const deactivateModalBgDark = () => {
    setModalBgDark(false);
  };

  const onPressBg = () => {
    if (modalCloseOnBgPress) {
      closeModal();
    }
  };

  return {
    renderModal: () =>
      modalOpened && (
        <ModalLayout bgDark={modalBgDark} onPressBg={onPressBg}>
          {modalContent}
        </ModalLayout>
      ),
    setModalContent,
    setModalBgDark,
    setModalCloseOnBgPress,
    openModal,
    closeModal,
    activateModalBgDark,
    deactivateModalBgDark,
  };
};

export default useModal;
