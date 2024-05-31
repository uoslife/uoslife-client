import React from 'react';
import {GestureResponderEvent, ImageSourcePropType} from 'react-native';
import styled from '@emotion/native';

interface FilterButtonProps {
  text?: string; // 텍스트 (옵션)
  onPress?: (event: GestureResponderEvent) => void; // 버튼이 눌렸을 때 실행될 함수 (옵션)
  imageSource?: ImageSourcePropType; // 이미지 (옵션)
  selected: boolean; // 버튼이 선택되었는지 여부
}

const FilterButton = ({
  text,
  onPress,
  imageSource,
  selected,
}: FilterButtonProps) => {
  if (!text && !imageSource) {
    return null;
  } //그럴 상황 없겠지만, 혹시나 에러 방지
  return (
    <ButtonContainer onPress={onPress} selected={selected}>
      {imageSource ? <ButtonImage source={imageSource} /> : null}
      {text ? <ButtonText>{text}</ButtonText> : null}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{selected: boolean}>`
  flex-direction: row;
  align-self: flex-start;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 9px;
  padding-right: 9px;
  align-items: center;
  gap: 4px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({selected}) => (selected ? '#4686FF' : '#E1DFDD')};
  background-color: #fff;
`;

const ButtonText = styled.Text`
  color: #201f1e;
  font-family: 'Pretendard';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const ButtonImage = styled.Image`
  width: 20px;
  height: 20px;
`;

export default FilterButton;
