import React from 'react';
import {GestureResponderEvent, ImageSourcePropType} from 'react-native';
import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

interface FilterButtonProps {
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
  imageSource?: ImageSourcePropType;
  isSelected: boolean;
}

const FilterButton = ({
  text,
  onPress,
  imageSource,
  isSelected,
}: FilterButtonProps) => {
  if (!text && !imageSource) {
    return null;
  }
  return (
    <ButtonContainer onPress={onPress} isSelected={isSelected}>
      {imageSource && <ButtonImage source={imageSource} />}
      {text && <Txt label={text} color="black" typograph="labelLarge" />}
    </ButtonContainer>
  );
};

export default FilterButton;

const ButtonContainer = styled.TouchableOpacity<{isSelected: boolean}>`
  flex-direction: row;
  align-self: flex-start;
  padding: 6px 9px;
  align-items: center;
  gap: 4px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({isSelected}) =>
    isSelected ? `${colors.primaryBrand}` : `${colors.grey40}`};
  background-color: ${colors.white};
`;

const ButtonImage = styled.Image`
  width: 20px;
  height: 20px;
`;
