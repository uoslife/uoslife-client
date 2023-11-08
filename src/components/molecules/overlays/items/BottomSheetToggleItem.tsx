import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {PressableProps} from 'react-native';
import ToggleSwitch from '../../../atoms/toggleSwitch/ToggleSwitch';

export type BottomSheetToggleItemProps = {
  isOn: boolean;
  description: string;
  onPress: PressableProps['onPress'];
};

const BottomSheetToggleItem = ({
  isOn,
  description,
  onPress,
}: BottomSheetToggleItemProps) => {
  return (
    <S.Root onPress={onPress}>
      <S.TextContainer>
        <Txt color="grey190" label={description} typograph="bodyLarge" />
      </S.TextContainer>
      <S.ToggleContainer>
        <ToggleSwitch isOn={isOn} />
      </S.ToggleContainer>
    </S.Root>
  );
};

export default BottomSheetToggleItem;

const S = {
  Root: styled.Pressable`
    flex-direction: row;
    align-items: center;

    gap: 24px;
  `,
  TextContainer: styled.View`
    flex: 1;
  `,
  ToggleContainer: styled.View`
    width: 48px;
    height: 48px;

    justify-content: center;
    align-items: center;
  `,
};
