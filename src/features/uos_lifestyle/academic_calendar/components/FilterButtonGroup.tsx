import React, {useState} from 'react';
import styled from '@emotion/native';
import FilterButton from './FilterButton';

const FilterButtonGroup = () => {
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null); // 선택된 버튼을 관리하는 상태

  const handleButtonPress = (id: number) => {
    setSelectedButtonId(id); // 버튼을 누를 때 선택된 버튼 상태를 업데이트
  };

  // 추후 버튼별 onPress 수정을 통해 동작 구현

  return (
    <Container>
      <FilterButton
        text="모두"
        onPress={() => handleButtonPress(1)}
        selected={selectedButtonId === 1}
      />
      <FilterButton
        text="알림"
        onPress={() => handleButtonPress(2)}
        selected={selectedButtonId === 2}
      />
      <FilterButton
        text="진행 중"
        onPress={() => handleButtonPress(3)}
        selected={selectedButtonId === 3}
      />
      <FilterButton
        onPress={() => handleButtonPress(4)}
        selected={selectedButtonId === 4}
        imageSource={require('../assets/images/filter_setting.png')}
      />
    </Container>
  );
};

const Container = styled.View`
  align-items: flex-start;
  flex-direction: row;
  gap: 12px;
`;

export default FilterButtonGroup;
