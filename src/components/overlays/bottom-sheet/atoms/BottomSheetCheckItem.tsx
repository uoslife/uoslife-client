import styled from '@emotion/native';
import {GestureResponderEvent} from 'react-native';

type BottomSheetCheckItemProps = {
  checked: boolean;
  description: {main: string; sub: string};
  onToggle: (e: GestureResponderEvent) => void;
  onPressForward?: (e: GestureResponderEvent) => void;
};

const BottomSheetCheckItem = ({
  checked,
  description: {main, sub},
  onToggle,
  onPressForward,
}: BottomSheetCheckItemProps) => {
  return (
    <S.ItemWrapper>
      <S.CheckArea onPress={onToggle}></S.CheckArea>
      <S.LeftArea>
        {!!onPressForward && <S.ForwardIconArea></S.ForwardIconArea>}
      </S.LeftArea>
    </S.ItemWrapper>
  );
};

export default BottomSheetCheckItem;

const S = {
  ItemWrapper: styled.View`
    flex-direction: row;
  `,
  CheckArea: styled.Pressable``,
  LeftArea: styled.Pressable``,
  ForwardIconArea: styled.Pressable``,
};
