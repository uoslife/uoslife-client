import React, {useState} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {useAtom, useSetAtom} from 'jotai';
import DatePaginationProps from './DatePaginationBar.type';
import {
  cafeteriaCommonDateAtom,
  cafeteriaDisplayDateAtom,
  cafeteriaMealTimeAtom,
} from '../../../../../store/cafeteria';
import {MealTimeType} from '../../../../../api/services/util/cafeteria/cafeteriaAPI.type';

const MIN_PAGE = 0;
const MAX_PAGE = 6;
const DEFAULT_MEALTIME = 'LUNCH' as MealTimeType;

const DatePaginationBar = ({date}: DatePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(date.day);
  const {thisWeekCommonDates, thisWeekDisplayDates} = date;

  const setCafeteriaMealTime = useSetAtom(cafeteriaMealTimeAtom);
  const setCafeteriaCommonDate = useSetAtom(cafeteriaCommonDateAtom);
  const [cafeteriaDisplayDate, setCafeteriaDisplayDate] = useAtom(
    cafeteriaDisplayDateAtom,
  );

  const changeCafeteriaDate = (commonDate: string, displayDate: string) => {
    setCafeteriaMealTime(DEFAULT_MEALTIME);
    setCafeteriaCommonDate(commonDate);
    setCafeteriaDisplayDate(displayDate);
  };

  const handleClickPageButton = (type: 'BACKWARD' | 'FORWARD') => {
    if (
      (currentPage === MIN_PAGE && type === 'BACKWARD') ||
      (currentPage === MAX_PAGE && type === 'FORWARD')
    )
      return;

    switch (type) {
      case 'BACKWARD':
        changeCafeteriaDate(
          thisWeekCommonDates[currentPage - 1],
          thisWeekDisplayDates[currentPage - 1],
        );
        setCurrentPage(prev => prev - 1);
        break;
      case 'FORWARD':
        changeCafeteriaDate(
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

      <Txt
        label={cafeteriaDisplayDate}
        color="grey150"
        typograph="titleMedium"
      />

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
