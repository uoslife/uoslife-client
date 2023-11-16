import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import {Icon, Txt} from '@uoslife/design-system';
import storage from '../../../../../storage';

export const HISTORIES_KEY = 'history-list';

// AnnounceMentMainScreen / AnnouncementSearchScreen에서 searchWordEnteringView === true일 때의 컴포넌트
const SearchWordEnteringView = ({
  navigateToNewSearchScreen,
}: {
  navigateToNewSearchScreen: (s: string) => void;
}) => {
  const [histories, setHistories] = useState<string[]>([]);

  useEffect(() => {
    const storageSearchHistory = storage.getString(HISTORIES_KEY);
    if (storageSearchHistory) {
      setHistories(JSON.parse(storageSearchHistory));
    }
  }, []);

  useEffect(() => {
    storage.set(HISTORIES_KEY, JSON.stringify(histories));
  }, [histories]);

  const deleteSingleHistory = (target: string) => () => {
    setHistories(prev => prev.filter(item => item !== target));
  };

  const deleteAllHistory = () => {
    setHistories([]);
  };

  const refreshHistory = (newItem: string) => {
    setHistories(prev => [...new Set([newItem, ...prev])]);
  };

  const onPressItem = (target: string) => () => {
    navigateToNewSearchScreen(target);
    refreshHistory(target);
  };

  return (
    <S.Root keyboardShouldPersistTaps="always">
      <S.Top>
        <S.TextContainer onPress={deleteAllHistory}>
          <Txt color="grey90" label="모두 지우기" typograph="bodyMedium" />
        </S.TextContainer>
      </S.Top>
      <S.HistoryListContainer>
        {histories.map(item => (
          <S.HistoryItemContainer onPress={onPressItem(item)} key={item}>
            <S.ItemLeftBox>
              <Icon color="grey130" name="history" height={24} width={24} />
              <Txt label={item} color="grey130" typograph="bodyLarge" />
            </S.ItemLeftBox>
            <S.DeleteBtn onPress={deleteSingleHistory(item)}>
              <Icon name="clear" color="grey90" width={24} height={24} />
            </S.DeleteBtn>
          </S.HistoryItemContainer>
        ))}
      </S.HistoryListContainer>
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
  HistoryListContainer: styled.View`
    padding: 0 16px;
  `,
  HistoryItemContainer: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 12px 4px 12px 8px;
    width: 100%;
  `,
  ItemLeftBox: styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,
  DeleteBtn: styled.Pressable``,
};

export default SearchWordEnteringView;
