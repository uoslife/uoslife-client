import React from 'react';
import styled from '@emotion/native';
import {Txt, Icon} from '@uoslife/design-system';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

interface MonthlyFilterProps {
  month: number;
  year: number;
  onPrevious: () => void;
  onNext: () => void;
}

const MonthlyFilter = ({
  month,
  year,
  onPrevious,
  onNext,
}: MonthlyFilterProps) => {
  const formatMonth = (monthValue: number) => {
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  };

  return (
    <S.Container>
      <AnimatePress variant="scale_up_3" onPress={onPrevious}>
        <Icon name="backward" width={24} height={24} color="grey190" />
      </AnimatePress>
      <Txt
        label={`${year}년 ${formatMonth(month)}월`}
        color="grey190"
        typograph="headlineMedium"
      />
      <AnimatePress variant="scale_up_3" onPress={onNext}>
        <Icon name="forward" width={24} height={24} color="grey190" />
      </AnimatePress>
    </S.Container>
  );
};

export default MonthlyFilter;

const S = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    width: 100%;
  `,
};
