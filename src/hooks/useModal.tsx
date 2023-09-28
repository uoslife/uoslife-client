import {useState} from 'react';
import ModalLayout from '../components/overlays/modal/ModalLayout';

type UseModalReturnValue = {
  renderModal: () => React.ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  openModal: () => void;
  closeModal: () => void;
  activateModalBgDark: () => void;
  deactivateModalBgDark: () => void;
  activateModalCloseOnBgPress: () => void;
  deactivateModalCloseOnBgPress: () => void;
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

  const activateModalCloseOnBgPress = () => {
    setModalCloseOnBgPress(true);
  };

  const deactivateModalCloseOnBgPress = () => {
    setModalCloseOnBgPress(false);
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
    openModal,
    closeModal,
    activateModalBgDark,
    deactivateModalBgDark,
    activateModalCloseOnBgPress,
    deactivateModalCloseOnBgPress,
  };
};

export default useModal;
