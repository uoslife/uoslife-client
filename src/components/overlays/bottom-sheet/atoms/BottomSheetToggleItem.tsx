import styled from '@emotion/native';
import {GestureResponderEvent} from 'react-native';

type BottomSheetToggleItemProps = {
  isOn: boolean;
  description: string;
  onToggle: (e: GestureResponderEvent) => void;
};

const BottomSheetCheckItem = ({
  isOn,
  onToggle,
}: BottomSheetToggleItemProps) => {
  return (
    <S.ItemWrapper>
      <S.CheckArea onPress={onToggle}></S.CheckArea>
    </S.ItemWrapper>
  );
};

export default BottomSheetCheckItem;

const S = {
  ItemWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  CheckArea: styled.Pressable``,
  LeftArea: styled.Pressable``,
  ForwardIconArea: styled.Pressable``,
};
