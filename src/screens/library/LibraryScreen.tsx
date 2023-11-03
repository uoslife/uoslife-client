import styled from '@emotion/native';
import {useEffect} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LibraryUserInfo from '../../components/molecules/screens/library/LibraryUserInfo';
import {LibraryStatus} from '../../components/molecules/screens/library/LibararyStatus';
import Header from '../../components/molecules/common/header/Header';

const LibraryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  // 정보 불러오는 API 붙이기
  useEffect(() => {}, []);

  return (
    <ScrollView style={{paddingTop: insets.top}} bounces={false}>
      <S.screenContainer>
        <Header label="도서관" onPressBackButton={handleGoBack} />
        <LibraryUserInfo />
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
