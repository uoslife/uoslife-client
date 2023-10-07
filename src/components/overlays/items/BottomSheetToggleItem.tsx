import styled from '@emotion/native';
import ToggleSwitch from '../../toggleSwitch/ToggleSwitch';
import {Txt} from '@uoslife/design-system';

export type BottomSheetToggleItemProps = {
  isOn: boolean;
  description: string;
  onToggle: () => void;
};

const BottomSheetToggleItem = ({
  isOn,
  description,
  onToggle,
}: BottomSheetToggleItemProps) => {
  return (
    <S.Root onPress={onToggle}>
      <S.TextContainer>
        <Txt color={'grey190'} label={description} typograph={'bodyLarge'} />
      </S.TextContainer>
      <S.ToggleContainer>
        <ToggleSwitch isOn={isOn} onToggle={onToggle} />
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
