import styled from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {useEffect} from 'react';
import {useSetAtom} from 'jotai';
import LibraryUserInfo from '../../components/molecules/screens/library/LibraryUserInfo';
import LibrarySeatStatus from '../../components/molecules/screens/library/LibararySeatStatus';
import Header from '../../components/molecules/common/header/Header';
import LibraryUsageHistory from '../../components/molecules/screens/library/LibraryUsageHistory';
import {isFocusedLibraryAtom} from '../../store/library';

const LibraryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const setIsFocusedLibraryScreen = useSetAtom(isFocusedLibraryAtom);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // '이용 중인 좌석' API의 auto refetch를 위해 도서관 화면의 isFocused 상태를 저장합니다.
  useEffect(() => {
    setIsFocusedLibraryScreen(isFocused);
  }, [isFocused, setIsFocusedLibraryScreen]);

  return (
    <ScrollView style={{paddingTop: insets.top}} bounces={false}>
      <S.ScreenContainer>
        <Header label="도서관" onPressBackButton={handleGoBack} />
        <LibraryUserInfo />
        <LibraryUsageHistory />
        <LibrarySeatStatus />
      </S.ScreenContainer>
    </ScrollView>
  );
};

export default LibraryScreen;

const S = {
  ScreenContainer: styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    padding-bottom: 70px;
  `,
};
