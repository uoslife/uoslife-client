import styled from '@emotion/native'
import React from 'react'

interface BottomSheetProps {
  children: React.JSX.Element
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  return (
    <S.background>
      <S.bottomSheetContainer>
        <S.bottomSheetContent>{children}</S.bottomSheetContent>
      </S.bottomSheetContainer>
    </S.background>
  )
}

export default BottomSheet;

const S = {
  background: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.32);
  `,
  bottomSheetContainer: styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: blue;
  `,
  bottomSheetContent: styled.View`
    padding-top: 32px;
    padding-left: 15px;
    padding-right: 15px;
  `
};