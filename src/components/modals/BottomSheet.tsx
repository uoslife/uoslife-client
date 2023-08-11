import styled from '@emotion/native'
import React from 'react'

interface BottomSheetProps {
  children: React.JSX.Element | React.JSX.Element[]
  darkBackground?: boolean; // 배경 어두워짐
  onBackgroundPress?: () => void;
  zIndex: number;
}

const BottomSheet = ({ children, darkBackground, onBackgroundPress, zIndex }: BottomSheetProps) => {
  return (
    <S.bottomSheetWrapper>
      <S.background zIndex={zIndex} onPress={onBackgroundPress} darkBackground={darkBackground}></S.background>
      <S.bottomSheetContainer zIndex={zIndex + 1}>
        <S.bottomContent>{children}</S.bottomContent>
      </S.bottomSheetContainer>
    </S.bottomSheetWrapper>
  )
}

export default BottomSheet;

interface BgProps {
  darkBackground?: boolean;
  zIndex: number;
}

interface ContainerProps {
  zIndex: number;
}

const S = {
  bottomSheetWrapper: styled.View`
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: flex-end;
  `,
  background: styled.Pressable<BgProps>`
    position: absolute;
    width: 100%;
    height: 100%;
  
    background-color: ${({ darkBackground }) => (darkBackground ? "rgba(0, 0, 0, 0.32)" : "rgba(0,0,0,0)")};
    z-index: ${({ zIndex }) => zIndex};
  `,
  bottomSheetContainer: styled.View<ContainerProps>`
    background-color: white;
    z-index: ${({ zIndex }) => zIndex};

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  `,
  bottomContent: styled.View`
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 24px;
    padding-bottom: 28px;
  `
};