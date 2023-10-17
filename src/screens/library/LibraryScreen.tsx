import styled from '@emotion/native';
import Header from '../../components/header/Header';
import {useEffect, useState} from 'react';

import {LibraryStatus} from '../../components/molecules/library/LibararyStatus';
import {ScrollView} from 'react-native-gesture-handler';
import LibraryUserInfo, {
  LibraryUserInfoType,
} from '../../components/molecules/library/LibraryUserInfo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const LibraryScreen = () => {
  const insets = useSafeAreaInsets();
  const [libraryUserInfo, setLibraryUserInfo] = useState<LibraryUserInfoType>({
    userName: '한유민',
    using: true,
    leave: false,
    timerTime: 1805,
    room: '쏼라쏼라열람실',
    seatNum: 21,
    timeOfUse: '14:00 ~ 20:00',
    extended: 0,
  });
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  // 정보 불러오는 API 붙이기
  useEffect(() => {}, []);

  return (
    <ScrollView style={{paddingTop: insets.top}}>
      <S.screenContainer>
        <Header label="도서관" onPressBackButton={handleGoBack} />
        <LibraryUserInfo libraryUserInfo={libraryUserInfo} />
        <LibraryStatus />
      </S.screenContainer>
    </ScrollView>
  );
};

export default LibraryScreen;

const S = {
  screenContainer: styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    padding-bottom: 70px;
  `,
};
