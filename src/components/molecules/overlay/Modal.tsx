import styled from '@emotion/native';

interface ModalProps {
  children: React.JSX.Element | React.JSX.Element[];
  zIndex: number;
}

const Modal = ({children, zIndex}: ModalProps) => {
  return <S.ModalContainer zIndex={zIndex}>{children}</S.ModalContainer>;
};

interface WrapperProps {
  zIndex: number;
}

export default Modal;

const S = {
  ModalContainer: styled.View<WrapperProps>`
    background-color: white;
    border-radius: 20px;
  `,
};
