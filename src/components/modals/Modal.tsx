import styled from '@emotion/native'
import React from 'react'

interface ModalProps {
  children: React.JSX.Element | React.JSX.Element[];
  darkBackground?: boolean; // 배경 어두워짐
  zIndex: number;
}

const Modal = ({children, zIndex}: ModalProps) => {
  return (
    <S.ModalWrapper zIndex={zIndex}>
      <S.ModalContainer>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
};

interface WrapperProps {
  zIndex: number;
}

export default Modal;

const S = {
  ModalWrapper: styled.View<WrapperProps>`
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: ${({zIndex}) => zIndex};
  `,
  ModalContainer: styled.View`
    background-color: white;
    border-radius: 20px;
  `,
  ModalContent: styled.View`
    padding-top: 24px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 16px;
  `,
};
