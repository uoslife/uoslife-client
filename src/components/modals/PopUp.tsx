import styled from '@emotion/native'
import React from 'react'

interface PopUpProps {
  children: React.JSX.Element | React.JSX.Element[]
  darkBackground?: boolean; // 배경 어두워짐
  onBackgroundPress?: () => void;
  onClose: () => void;
  zIndex: number;
}

const PopUp = ({ children, darkBackground, onBackgroundPress, zIndex, onClose }: PopUpProps) => {
  return (
    <S.popUpWrapper>
      <S.background zIndex={zIndex} onPress={onBackgroundPress} darkBackground={darkBackground} />
      <S.popUpContainer zIndex={zIndex + 1}>
        <S.popUpContent>{children}</S.popUpContent>
        <S.closeBtn onPress={onClose}>
          닫기
        </S.closeBtn>
      </S.popUpContainer>
    </S.popUpWrapper>
  )
}

interface BgProps {
  darkBackground?: boolean;
  zIndex: number;
}

interface ContainerProps {
  zIndex: number;
}

export default PopUp;

const S = {
  popUpWrapper: styled.View`
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  background: styled.Pressable<BgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({ darkBackground }) => (darkBackground ? "rgba(0, 0, 0, 0.32)" : "rgba(0,0,0,0)")};
    z-index: ${({ zIndex }) => zIndex};
  `,
  popUpContainer: styled.View<ContainerProps>`
    background-color: white;    
    border-radius: 20px;
  `,
  popUpContent: styled.View`
    padding-top: 24px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 16px;
  `,
  closeBtn: styled.Text`
    display: flex;

    padding-top: 12px;
    padding-bottom: 12px;

    border-top-width: 1px;
    border-color: #E1DFDD;

    text-align: center;
  `,
};
