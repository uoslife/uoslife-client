import styled from '@emotion/native';

type BottomSheetLayoutProps = {
  children: React.ReactNode;
  bgDark: boolean;
  onPressBg: () => void;
};

const BottomSheetLayout = ({children, onPressBg}: BottomSheetLayoutProps) => {
  return (
    <S.Wrapper>
      <S.Background bgDark={false} onPress={onPressBg} />
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
};

export default BottomSheetLayout;

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
    justify-content: flex-end;
  `,
  Background: styled.Pressable<SBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
    z-index: 5;
  `,
  Container: styled.View`
    background-color: white;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  `,
};
