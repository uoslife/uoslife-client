import {View} from 'react-native';
import styled from '@emotion/native';
import {Txt, colors, colorsType} from '@uoslife/design-system';

type ButtonColorType = 'ACCEPT' | 'SECONDARY' | 'DENY';

export type ModalStandardButtonProps = {
  type: ButtonColorType;
  label: string;
  onPress: () => void;
};

const TypeColorMapping: {[key in ButtonColorType]: colorsType} = {
  ACCEPT: 'primaryBrand',
  SECONDARY: 'grey130',
  DENY: 'grey90',
};

const ModalStandardButton = ({
  label,
  type,
  onPress,
}: ModalStandardButtonProps) => {
  return (
    <View style={{borderTopColor: colors.grey40, borderTopWidth: 1}}>
      <S.ButtonContainer onPress={onPress}>
        <Txt
          color={TypeColorMapping[type]}
          label={label}
          typograph="bodyMedium"
        />
      </S.ButtonContainer>
    </View>
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
