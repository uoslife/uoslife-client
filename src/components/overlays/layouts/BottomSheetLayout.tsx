import styled from '@emotion/native';

type BottomSheetLayoutProps = {
  children: React.ReactNode;
  bgDark: boolean;
  onPressBg: () => void;
};

// useModal - layout: "bottom-sheet" 전용 컴포넌트입니다. 해당 hook 외 다른 곳에서 사용하지 않도록 주의해주세요.
const BottomSheetLayout = ({
  children,
  onPressBg,
  bgDark,
}: BottomSheetLayoutProps) => {
  return (
    <S.Wrapper>
      <S.Background bgDark={bgDark} onPress={onPressBg} />
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
};

export default BottomSheetLayout;

type SBgProps = {
  bgDark: boolean;
  onPress: () => void;
};

const bgDarkRgba = 'rgba(0, 0, 0, 0.32)';
const bgTranparentRgba = 'rgba(0, 0, 0, 0)';

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

    background-color: ${({bgDark}) => (bgDark ? bgDarkRgba : bgTranparentRgba)};
  `,
  Container: styled.View`
    background-color: white;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  `,
};
