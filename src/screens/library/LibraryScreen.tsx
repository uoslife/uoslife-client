import styled from '@emotion/native';
import {Suspense} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LibraryUserInfo from '../../components/molecules/screens/library/LibraryUserInfo';
import LibrarySeatStatus from '../../components/molecules/screens/library/LibararySeatStatus';
import Header from '../../components/molecules/common/header/Header';
import LibraryUsageHistory from '../../components/molecules/screens/library/LibraryUsageHistory';
import Skeleton from '../../components/molecules/common/skeleton/Skeleton';

const LibraryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={{paddingTop: insets.top}} bounces={false}>
      <S.ScreenContainer>
        <Header label="도서관" onPressBackButton={handleGoBack} />
        <LibraryUserInfo />
        <Suspense fallback={<Skeleton variant="card" />}>
          <LibraryUsageHistory />
        </Suspense>
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
