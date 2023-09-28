import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';

type ModalMenuButtonProps = {
  label: string;
  onPress: () => void;
};

const ModalMenuButton = ({label, onPress}: ModalMenuButtonProps) => {
  return (
    <S.ButtonContainer onPress={onPress}>
      <Txt color={'grey190'} label={label} typograph={'bodyLarge'} />
      <Icon name={'forward'} color={'grey130'} height={24} width={24} />
    </S.ButtonContainer>
  );
};

export default ModalMenuButton;

const S = {
  ButtonContainer: styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 12px 16px;
  `,
};
