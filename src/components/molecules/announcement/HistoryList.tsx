import React from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {Alert} from 'react-native';

const HistoryList = ({
  histories,
  executeSearch,
}: {
  histories: string[];
  executeSearch: (searchWord: string) => void;
}) => {
  return (
    <S.HistoryListContainer>
      {histories.map(item => (
        <S.HistoryItemContainer
          onPress={() => {
            executeSearch(item);
          }}
          key={item}>
          <S.ItemLeftBox>
            <Icon color={'grey130'} name={'history'} height={24} width={24} />
            <Txt label={item} color={'grey130'} typograph={'bodyLarge'} />
          </S.ItemLeftBox>
          <S.DeleteBtn
            onPress={e => {
              e.stopPropagation();
              Alert.alert('삭제');
            }}>
            <Icon name="clear" color="grey90" width={24} height={24} />
          </S.DeleteBtn>
        </S.HistoryItemContainer>
      ))}
    </S.HistoryListContainer>
  );
};

export default HistoryList;

const S = {
  HistoryListContainer: styled.ScrollView`
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
