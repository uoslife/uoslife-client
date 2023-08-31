import React from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AnnouncementNavigationProps} from '../../../navigators/AnnouncementStackNavigator';

const HistoryList = ({histories}: {histories: string[]}) => {
  const navigate = useNavigation<AnnouncementNavigationProps>();

  return (
    <S.listContainer>
      {histories.map(item => (
        <S.historyItemContainer
          onPress={() => {
            navigate.navigate('AnnouncementSearchResult', {searchWord: item});
          }}>
          <S.iconAndTxt>
            <Icon color={'grey130'} name={'history'} height={24} width={24} />
            <Txt label={item} color={'grey130'} typograph={'bodyLarge'} />
          </S.iconAndTxt>
          <Pressable
            onPress={e => {
              e.stopPropagation();
              Alert.alert('삭제');
            }}>
            <Icon name="clear" color="grey90" width={24} height={24} />
          </Pressable>
        </S.historyItemContainer>
      ))}
    </S.listContainer>
  );
};

export default HistoryList;

const S = {
  listContainer: styled.View`
    padding: 0 16px;
  `,
  historyItemContainer: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 12px 4px 12px 8px;
    width: 100%;
  `,
  iconAndTxt: styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,
};
