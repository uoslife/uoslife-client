import styled from '@emotion/native';
import {GestureResponderEvent} from 'react-native';

type BottomSheetCheckItemProps = {
  id: string;
  checked: boolean;
  description: {main: string; sub: string};
  checkedSetter: (id: string) => void;
  onPressForward?: (e: GestureResponderEvent) => void;
};

const BottomSheetCheckItem = ({
  id,
  checked,
  description: {main, sub},
  checkedSetter,
  onPressForward,
}: BottomSheetCheckItemProps) => {
  const toggleChecked = () => {
    checkedSetter(id);
  };

  return (
    <S.ItemWrapper>
      <S.CheckArea onPress={toggleChecked}></S.CheckArea>
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
