import {useState, useEffect, useMemo} from 'react';
import Modal from '../components/overlay/Modal';
import styled from '@emotion/native';

const useModal = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactElement>(<></>);
  const [modalZIndex, setModalZIndex] = useState<number>(10);
  const [modalBgDark, setModalBgDark] = useState<boolean>(true);
  // parameter를 고차함수로 넘겨줘야 하니 주의하세요..
  const [modalBgOnpress, setModalBgOnpress] = useState<() => void>(() => {});

  const openModal = () => {
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
  };
  const activateBgDark = () => {
    setModalBgDark(true);
  };
  const deactivateBgDark = () => {
    setModalBgDark(false);
  };

  const ModalComponent = useMemo(
    () => () =>
      modalOpened && (
        <S.modalWrapper>
          <S.modalBg
            bgDark={modalBgDark}
            zIndex={modalZIndex}
            onPress={modalBgOnpress}></S.modalBg>
          <Modal zIndex={modalZIndex}>{modalContent}</Modal>
        </S.modalWrapper>
      ),
    [modalOpened, modalBgDark, modalZIndex, modalBgOnpress, modalContent],
  );

  return {
    Modal: modalOpened
      ? () => (
          <S.modalWrapper>
            <S.modalBg
              bgDark={modalBgDark}
              zIndex={modalZIndex}
              onPress={modalBgOnpress}></S.modalBg>
            <Modal zIndex={modalZIndex}>{modalContent}</Modal>
          </S.modalWrapper>
        )
      : () => null,
    openModal,
    closeModal,
    setModalContent,
    setModalZIndex,
    activateBgDark,
    deactivateBgDark,
    setModalBgOnpress,
  };
};

interface StyledBgProps {
  zIndex: number;
  bgDark: boolean;
}

const S = {
  modalWrapper: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  modalBg: styled.Pressable<StyledBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
    z-index: ${({zIndex}) => zIndex};
  `,
};

export default useModal;
