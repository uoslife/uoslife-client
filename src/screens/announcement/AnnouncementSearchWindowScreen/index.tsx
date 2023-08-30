import {Icon, Input, Txt} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import {AnnouncementNavigationProps} from '../../../navigators/AnnouncementStackNavigator';

const AnnouncementSearchWindowScreen = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // API: 히스토리 블러오기 기능 붙이기
  useEffect(() => {
    const DUMMY_HISTORY = [];
    for (let i = 0; i < 5; i++) DUMMY_HISTORY.push(`히스토리 ${i}`);

    setHistory(DUMMY_HISTORY);
  }, []);

  const ClockIcon = () => (
    <Image source={require('../../../assets/images/clock.png')} />
  );
  const XIcon = () => (
    <Image source={require('../../../assets/images/x.png')} />
  );

  const navigation = useNavigation<AnnouncementNavigationProps>();

  // API 붙이기: 히스토리 새로 등록, 페이지 이동
  const searchEnterHandler = () => {
    // 히스토리 등록 API
    navigation.navigate('AnnouncementSearchResult', {searchWord: inputValue});
    // 페이지 이동
  };

  // API 붙이기: 단일 히스토리 삭제
  const deleteHistorySingleHandler = (id: string) => {
    setHistory(history.filter(item => item !== id));
  };

  // API 붙이기: 전체 히스토리 삭제
  const deleteHistoryAllHandler = () => {
    Alert.alert('에베베베베벡');

    setHistory([]);
  };

  return (
    <View>
      <Header label={''} />
      <S.searchInputRow>
        <Input
          value={inputValue}
          onChangeText={text => {
            setInputValue(text);
          }}
          placeholder={'검색어를 입력해주세요'}
        />
        <View>
          <Txt
            onPress={deleteHistoryAllHandler}
            color={'black'}
            label={'모두 지우기'}
            typograph={'bodyLarge'}
          />
          <Txt
            onPress={searchEnterHandler}
            color={'black'}
            label={'검색'}
            typograph={'bodyLarge'}
          />
        </View>
      </S.searchInputRow>
      {history.map(item => (
        <S.historyItemContainer key={item}>
          <S.clockAndTxt>
            <ClockIcon />
            <Txt label={item} color="black" typograph="bodyLarge" />
          </S.clockAndTxt>
          <Pressable
            key={item}
            onPress={() => {
              deleteHistorySingleHandler(item);
            }}>
            <XIcon />
          </Pressable>
        </S.historyItemContainer>
      ))}
    </View>
  );
};

export default AnnouncementSearchWindowScreen;

const S = {
  searchInputRow: styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
  `,
  historyItemContainer: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 8px;
    width: 100%;
  `,
  clockAndTxt: styled.View`
    displayd: flex;
    flex-direction: row;
    align-items: center;
  `,
};
