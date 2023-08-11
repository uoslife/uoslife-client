import styled from '@emotion/native'
import React from 'react'

interface PopUpProps {
  children: React.JSX.Element
}

const PopUp = ({ children }: PopUpProps) => {
  return (
    <S.modal>{children}</S.modal>
  )
}

export default PopUp;

const S = {
  background: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.32);
  `,
  modal: styled.Modal`
  
  `
};
