import React, {useState} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {Alert} from 'react-native';

type HistoryListProps = {
  navigateToNewSearchScreen: (s: string) => void;
};

const DUMMY_INITIAL_HISTORY_LIST = new Array(20)
  .fill(null)
  .map((_, i) => `dummy${i}`);

const HistoryList = ({navigateToNewSearchScreen}: HistoryListProps) => {
  // TODO: MMKV Storage로 변경
  const [histories, setHistories] = useState<string[]>(
    DUMMY_INITIAL_HISTORY_LIST,
  );

  return (
    <S.Root>
      {histories.map(item => (
        <S.HistoryItemContainer
          onPress={() => {
            navigateToNewSearchScreen(item);
          }}
          key={item}>
          <S.ItemLeftBox>
            <Icon color="grey130" name="history" height={24} width={24} />
            <Txt label={item} color="grey130" typograph="bodyLarge" />
          </S.ItemLeftBox>
          <S.DeleteBtn
            onPress={e => {
              Alert.alert('삭제');
            }}>
            <Icon name="clear" color="grey90" width={24} height={24} />
          </S.DeleteBtn>
        </S.HistoryItemContainer>
      ))}
    </S.Root>
  );
};

export default HistoryList;

const S = {
  Root: styled.View`
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
