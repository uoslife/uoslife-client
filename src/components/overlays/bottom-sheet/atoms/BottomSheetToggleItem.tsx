import styled from '@emotion/native';

type BottomSheetToggleItemProps = {
  id: string;
  isOn: boolean;
  description: string;
  isOnSetter: (id: string) => void;
};

const BottomSheetCheckItem = ({
  id,
  isOn,
  isOnSetter,
}: BottomSheetToggleItemProps) => {
  const toggleIsOn = () => {
    isOnSetter(id);
  };

  return (
    <S.ItemWrapper>
      <S.CheckArea onPress={toggleIsOn}></S.CheckArea>
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
