import React from 'react';
import styled from '@emotion/native';

interface MonthlyFilterProps {
  month: string;
  onPrevious: () => void;
  onNext: () => void;
}

const MonthlyFilter = ({month, onPrevious, onNext}: MonthlyFilterProps) => {
  return (
    <Container>
      <ArrowButton onPress={onPrevious}>
        <ArrowImage source={require('../assets/images/arrow_back_ios.png')} />
      </ArrowButton>
      <MonthText>{month}</MonthText>
      <ArrowButton onPress={onNext}>
        <ArrowImage
          source={require('../assets/images/arrow_forward_ios.png')}
        />
      </ArrowButton>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 140px;
  gap: 12px;
`;

const MonthText = styled.Text`
  color: #201f1e;
  font-family: 'Pretendard';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

const ArrowButton = styled.TouchableOpacity``;

const ArrowImage = styled.Image`
  width: 24px;
  height: 24px;
`;

export default MonthlyFilter;
