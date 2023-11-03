import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';

export type ModalMenuButtonProps = {
  label: string;
  onPress: () => void;
};

const ModalMenuButton = ({label, onPress}: ModalMenuButtonProps) => {
  return (
    <S.Wrapper>
      <S.Container onPress={onPress}>
        <Txt color="grey190" label={label} typograph="bodyLarge" />
        <Icon name="forwardArrow" color="grey130" height={24} width={24} />
      </S.Container>
    </S.Wrapper>
  );
};

export default ModalMenuButton;

const S = {
  // Figma 페이지와 매칭을 위해 padding을 부여하는 Wrapper 컴포넌트를 추가로 작성
  Wrapper: styled.Pressable`
    width: 100%;
    padding: 0px 16px;
  `,
  Container: styled.Pressable`
    width: 100%;
    padding: 12px 4px 12px 8px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
};
