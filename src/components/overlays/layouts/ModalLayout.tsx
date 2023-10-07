import styled from '@emotion/native';

type ModalLayoutProps = {
  children: React.ReactNode;
  bgDark: boolean;
  onPressBg: () => void;
};

// useModal - layout: "modal" 전용 컴포넌트입니다. 해당 hook 외 다른 곳에서 사용하지 않도록 주의해주세요.
const ModalLayout = ({children, bgDark, onPressBg}: ModalLayoutProps) => {
  return (
    <S.Wrapper>
      <S.Background bgDark={bgDark} onPress={onPressBg} />
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
};

export default ModalLayout;

type StyledBgProps = {
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

    justify-content: center;
    align-items: center;

    z-index: 10;
  `,
  Background: styled.Pressable<StyledBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) => (bgDark ? bgDarkRgba : bgTranparentRgba)};
  `,
  Container: styled.View`
    background-color: white;
    width: 300px;
    border-radius: 20px;
  `,
};
