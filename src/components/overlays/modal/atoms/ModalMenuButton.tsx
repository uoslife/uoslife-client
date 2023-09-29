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
        <Txt color={'grey190'} label={label} typograph={'bodyLarge'} />
        {/* TODO: width, height 지정 제대로 했음에도 피그마에서보다 크게 보이는 문제 */}
        {/* design-system에서 수정 필요 */}
        <Icon name={'forward'} color={'grey130'} height={24} width={24} />
      </S.Container>
    </S.Wrapper>
  );
};

export default ModalMenuButton;

const S = {
  // Figma 페이지와 매칭을 위해 Wrapper 컴포넌트를 추가로 작성
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
