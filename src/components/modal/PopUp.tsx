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
  modal: styled.Modal`

  `
};
