import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {PressableProps} from 'react-native';
import ToggleSwitch from '../../../atoms/toggleSwitch/ToggleSwitch';

export type BottomSheetToggleItemProps = {
  isOn: boolean;
  description: string;
  onPress: PressableProps['onPress'];
  disable?: boolean;
};

const BottomSheetToggleItem = ({
  isOn,
  description,
  onPress,
  disable,
}: BottomSheetToggleItemProps) => {
  return (
    <S.Root onPress={disable ? undefined : onPress}>
      <S.TextContainer>
        <Txt
          color={disable ? 'grey40' : 'grey190'}
          label={description}
          typograph="bodyLarge"
        />
      </S.TextContainer>
      <S.ToggleContainer>
        <ToggleSwitch
          isOn={disable ? false : isOn}
          onToggle={disable ? undefined : onPress}
          disable={disable}
        />
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
