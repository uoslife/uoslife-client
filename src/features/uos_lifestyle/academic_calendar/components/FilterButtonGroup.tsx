import React, {useState} from 'react';
import styled from '@emotion/native';
import FilterButton from './FilterButton';

const FilterButtonGroup = () => {
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(1);

  const handleButtonPress = (id: number) => {
    setSelectedButtonId(id);
  };
  // 추후 버튼별 onPress 수정을 통해 동작 구현

  return (
    <Container>
      <FilterButton
        text="모두"
        onPress={() => handleButtonPress(1)}
        isSelected={selectedButtonId === 1}
      />
      <FilterButton
        text="알림"
        onPress={() => handleButtonPress(2)}
        isSelected={selectedButtonId === 2}
      />
      <FilterButton
        text="진행 중"
        onPress={() => handleButtonPress(3)}
        isSelected={selectedButtonId === 3}
      />
      <FilterButton
        onPress={() => handleButtonPress(4)}
        isSelected={selectedButtonId === 4}
        imageSource={require('../assets/images/filter_setting.png')}
      />
    </Container>
  );
};

export default FilterButtonGroup;

const Container = styled.View`
  align-items: flex-start;
  flex-direction: row;
  gap: 12px;
`;
