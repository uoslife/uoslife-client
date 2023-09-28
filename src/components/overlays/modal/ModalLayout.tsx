import styled from '@emotion/native';

type ModalLayoutProps = {
  children: React.ReactNode;
  bgDark: boolean;
  onPressBg: () => void;
};

const ModalLayout = ({children, bgDark, onPressBg}: ModalLayoutProps) => {
  return (
    <S.Wrapper>
      <S.Background bgDark={bgDark} onPress={onPressBg}></S.Background>
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
};

export default ModalLayout;

type SBgProps = {
  bgDark: boolean;
  onPress: () => void;
};

const S = {
  Wrapper: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Background: styled.Pressable<SBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
  `,
  Container: styled.View`
    background-color: white;
    width: 300px;
    z-index: 10;
    border-radius: 20px;
  `,
};
