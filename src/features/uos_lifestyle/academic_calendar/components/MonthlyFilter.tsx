import React from 'react';
import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

interface MonthlyFilterProps {
  month: number;
  onPrevious: () => void;
  onNext: () => void;
}

const MonthlyFilter = ({month, onPrevious, onNext}: MonthlyFilterProps) => {
  return (
    <Container>
      <ArrowButton onPress={onPrevious}>
        <ArrowImage source={require('../assets/images/arrow_back.png')} />
      </ArrowButton>
      <Txt label={`${month}월`} color="black" typograph="headlineMedium" />
      <ArrowButton onPress={onNext}>
        <ArrowImage source={require('../assets/images/arrow_forward.png')} />
      </ArrowButton>
    </Container>
  );
};

export default MonthlyFilter;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 140px;
  gap: 12px;
`;

const ArrowButton = styled.TouchableOpacity``;

const ArrowImage = styled.Image`
  width: 24px;
  height: 24px;
`;
