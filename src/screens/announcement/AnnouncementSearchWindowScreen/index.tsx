import {Icon, Input, Txt} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import {
  AnnouncementNavigationProps,
  AnnouncementStackParamList,
} from '../../../navigators/AnnouncementStackNavigator';
import SearchInput from '../../../components/forms/searchInput/SearchInput';
import HistoryList from '../../../components/molecules/announcement/HistoryList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AnnouncementSearchWindowScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementSearchWindow'
>;

const AnnouncementSearchWindowScreen = ({
  route,
}: AnnouncementSearchWindowScreenProps) => {
  const [histories, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>(
    route.params.prevSearchWord || '',
  );

  // API: 히스토리 블러오기 기능 붙이기
  useEffect(() => {
    const DUMMY_HISTORY = [];
    for (let i = 0; i < 5; i++) DUMMY_HISTORY.push(`히스토리 ${i}`);

    setHistory(DUMMY_HISTORY);
  }, []);

  const navigation = useNavigation<AnnouncementNavigationProps>();

  // API 붙이기: 히스토리 새로 등록, 페이지 이동
  const searchEnterHandler = () => {
    // 히스토리 등록 API
    navigation.navigate('AnnouncementSearchResult', {searchWord: inputValue});
    // 페이지 이동
  };

  // API 붙이기: 전체 히스토리 삭제
  const deleteHistoryAllHandler = () => {
    Alert.alert('전체 히스토리 삭제 API를 달아주세요.');
  };

  return (
    <View>
      {/* 헤더에 검색창 넣기 */}
      <Header label={''} />
      <S.searchInputRow>
        <View style={{padding: 4}}>
          <Icon color="grey150" height={24} width={24} name={'backArrow'} />
        </View>
        <View style={{position: 'relative'}}>
          <SearchInput
            placeholder={'검색어를 입력해주세요'}
            value={inputValue}
            onChangeText={text => {
              setInputValue(text);
            }}
            onSubmitEditing={() => {
              searchEnterHandler();
            }}
          />
        </View>
      </S.searchInputRow>
      <S.rowReversed>
        <S.eraseAllTxtWrapper onPress={deleteHistoryAllHandler}>
          <Txt
            color={'grey90'}
            label={'모두 지우기'}
            typograph={'bodyMedium'}
          />
        </S.eraseAllTxtWrapper>
      </S.rowReversed>
      <HistoryList histories={histories} />
    </View>
  );
};

export default AnnouncementSearchWindowScreen;

const S = {
  searchInputRow: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  `,
  clockAndTxt: styled.View`
    displayd: flex;
    flex-direction: row;
    align-items: center;
  `,
  rowReversed: styled.View`
    width: 100%;

    display: flex;
    flex-direction: row-reverse;
  `,
  eraseAllTxtWrapper: styled.Pressable`
    padding: 10px 20px;
  `,
};
