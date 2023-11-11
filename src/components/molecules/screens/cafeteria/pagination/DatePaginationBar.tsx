import React, {useState} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import DatePaginationProps from './DatePaginationBar.type';

const MIN_PAGE = 0;
const MAX_PAGE = 6;

const DatePaginationBar = ({
  date,
  displayDate,
  changeCafeteriaByDate,
}: DatePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(date.day);
  const {thisWeekCommonDates, thisWeekDisplayDates} = date;
  const handleClickPageButton = (type: 'BACKWARD' | 'FORWARD') => {
    if (
      (currentPage === MIN_PAGE && type === 'BACKWARD') ||
      (currentPage === MAX_PAGE && type === 'FORWARD')
    )
      return;

    switch (type) {
      case 'BACKWARD':
        changeCafeteriaByDate(
          thisWeekCommonDates[currentPage - 1],
          thisWeekDisplayDates[currentPage - 1],
        );
        setCurrentPage(prev => prev - 1);
        break;
      case 'FORWARD':
        changeCafeteriaByDate(
          thisWeekCommonDates[currentPage + 1],
          thisWeekDisplayDates[currentPage + 1],
        );
        setCurrentPage(prev => prev + 1);
        break;
    }
  };

  return (
    <TabBarContainer>
      <TabBarButton
        onPress={() => handleClickPageButton('BACKWARD')}
        disabled={currentPage === MIN_PAGE}>
        {currentPage === MIN_PAGE ? (
          <Icon name="backward" color="grey40" width={24} height={24} />
        ) : (
          <Icon name="backward" color="grey190" width={24} height={24} />
        )}
      </TabBarButton>

      {displayDate && (
        <Txt label={displayDate} color="grey150" typograph="titleMedium" />
      )}

      <TabBarButton
        onPress={() => handleClickPageButton('FORWARD')}
        disabled={currentPage === MAX_PAGE}>
        {currentPage === MAX_PAGE ? (
          <Icon name="forward" color="grey40" width={24} height={24} />
        ) : (
          <Icon name="forward" color="grey190" width={24} height={24} />
        )}
      </TabBarButton>
    </TabBarContainer>
  );
};

const TabBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TabBarButton = styled.TouchableOpacity`
  padding: 8px;
  align-items: flex-start;
`;

export default DatePaginationBar;
