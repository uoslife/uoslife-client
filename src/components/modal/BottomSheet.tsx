import styled from '@emotion/native'
import React from 'react'
import { Dimensions, Modal, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface BottomSheetProps {
  children: React.JSX.Element
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  return (
    <S.bottomSheetWrapper>
      <S.bottomSheet>{children}</S.bottomSheet>
    </S.bottomSheetWrapper>
  )
}

export default BottomSheet;

const S = {
  bottomSheetWrapper: styled.View`
    position: absolute;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    border: black;
  `,
  bottomSheet: styled.View`
    border: black;
    background-color: blue;
  `
};