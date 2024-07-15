import React, {useState} from 'react';
import styled from '@emotion/native';
import FilterButton from './FilterButton';
import {STATUSES} from '../constants';

interface FilterButtonGroupProps {
  selectedFilter: string;
  handleFilterPress: (filterName: string) => void;
}

const FilterButtonGroup = ({
  selectedFilter,
  handleFilterPress,
}: FilterButtonGroupProps) => {
  return (
    <S.Container>
      {STATUSES.map(status => (
        <FilterButton
          key={status}
          text={status}
          onPress={() => handleFilterPress(status)}
          isSelected={selectedFilter === status}
        />
      ))}
    </S.Container>
  );
};

export default FilterButtonGroup;

const S = {
  Container: styled.View`
    align-items: flex-start;
    flex-direction: row;
    gap: 12px;
  `,
};
