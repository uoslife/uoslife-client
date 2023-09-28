import styled from '@emotion/native';
import {GestureResponderEvent} from 'react-native';

type BottomSheetToggleItemProps = {
  isOn: boolean;
  description: string;
  onToggle: (e: GestureResponderEvent) => void;
};

const BottomSheetCheckItem = ({
  isOn,
  description,
  onToggle,
}: BottomSheetToggleItemProps) => {
  return (
    <S.ItemWrapper>
      <S.Description onPress={onToggle}>{description}</S.Description>
    </S.ItemWrapper>
  );
};

export default BottomSheetCheckItem;

const S = {
  ItemWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  Description: styled.Pressable``,
};
