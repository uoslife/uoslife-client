import styled from '@emotion/native';
import {Txt, colorsType} from '@uoslife/design-system';

type ButtonColorType = 'ACCEPT' | 'SECONDARY' | 'DENY';

type ModalStandardButtonProps = {
  type: ButtonColorType;
  label: string;
  onPress: () => void;
};

const TypeColorMapping: {[key in ButtonColorType]: colorsType} = {
  ACCEPT: 'primaryBrand',
  SECONDARY: 'grey90',
  DENY: 'grey130',
};

const ModalStandardButton = ({
  label,
  type,
  onPress,
}: ModalStandardButtonProps) => {
  return (
    <S.ButtonContainer onPress={onPress}>
      <Txt
        color={TypeColorMapping[type]}
        label={label}
        typograph={'bodyMedium'}
      />
    </S.ButtonContainer>
  );
};

export default ModalStandardButton;

const S = {
  ButtonContainer: styled.Pressable`
    justify-content: center;
    align-items: center;

    padding: 10px 20px;
  `,
};
