import React, {useState} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import DatePaginationProps from './DatePaginationBar.type';

const DatePaginationBar = ({
  totalPages,
  datePaginationItems,
}): DatePaginationProps => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <TabBarContainer>
      <TabBarButton
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        {currentPage === 1 ? (
          <Icon name={'backward'} color='grey40' width={24} height={24} />
        ) : (
          <Icon name={'backward'} color='grey190' width={24} height={24} />
        )}
      </TabBarButton>

      <Txt
        label={datePaginationItems[currentPage - 1]}
        color={'grey150'}
        typograph={'titleMedium'}
      />

      <TabBarButton
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        {currentPage === totalPages ? (
          <Icon name={'forward'} color='grey40' width={24} height={24} />
        ) : (
          <Icon name={'forward'} color='grey190' width={24} height={24} />
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
