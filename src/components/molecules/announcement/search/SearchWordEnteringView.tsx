import styled from '@emotion/native';
import React from 'react';
import HistoryList from './HistoryList';
import {Txt} from '@uoslife/design-system';

// AnnounceMentMainScreen / AnnouncementSearchScreen에서 searchWordEnteringView === true일 때의 컴포넌트
const SearchWordEnteringView = ({
  navigateToNewSearchScreen,
}: {
  navigateToNewSearchScreen: (s: string) => void;
}) => {
  return (
    <S.Root keyboardShouldPersistTaps={'always'}>
      <S.Top>
        <S.TextContainer
          onPress={() => {
            // TODO: 스토리지 연결해서 검색 기록 모두 지우기
          }}>
          <Txt
            color={'grey90'}
            label={'모두 지우기'}
            typograph={'bodyMedium'}
          />
        </S.TextContainer>
      </S.Top>
      <HistoryList navigateToNewSearchScreen={navigateToNewSearchScreen} />
    </S.Root>
  );
};

const S = {
  Root: styled.ScrollView``,
  Top: styled.View`
    width: 100%;
    padding: 4px 0;

    flex-direction: row-reverse;
  `,
  TextContainer: styled.Pressable`
    padding: 10px 20px;
  `,
};

export default SearchWordEnteringView;
