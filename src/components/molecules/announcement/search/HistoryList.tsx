import React, {useState} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {Alert, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AnnouncementNavigationProps} from '../../../../navigators/AnnouncementStackNavigator';

const HistoryList = ({}: {}) => {
  // TODO: MMKV Storage로 변경
  const [histories, setHistories] = useState<string[]>([
    'dummy',
    'dummy2',
    'dummy3',
    'dummy4',
    'dummy5',
    'dummy6',
    'dummy7',
    'dummy8',
    'dummy9',
    'dummy10',
    'dummy11',
    'dummy12',
    'dummy13',
    'dummy14',
    'dummy15',
    'dummy16',
    'dummy17',
    'dummy18',
    'dummy19',
    'dummy20',
  ]);

  const navigation = useNavigation<AnnouncementNavigationProps>();

  const navigateToNewSearchScreen = (searchWord: string) => {
    navigation.push('AnnouncementSearch', {
      initialSearchWord: searchWord,
    });
  };

  return (
    <S.Root>
      {histories.map(item => (
        <S.HistoryItemContainer
          onPress={() => {
            navigateToNewSearchScreen(item);
          }}
          key={item}>
          <S.ItemLeftBox>
            <Icon color={'grey130'} name={'history'} height={24} width={24} />
            <Txt label={item} color={'grey130'} typograph={'bodyLarge'} />
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
