import {useEffect, useMemo, useState} from 'react';
import {useSetAtom} from 'jotai';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import Header from '../../components/molecules/common/header/Header';
import {isFocusedLibraryAtom} from '../../store/library';
import {LibraryMainScreenProps} from '../../navigators/types/library';
import TabView from '../../components/molecules/common/tab_view/TabView';
import {
  LibraryTabsEnum,
  LibraryTabsType,
} from '../../configs/utility/libraryTabs';
import MySeatScreen from './main_screen/MySeatScreen';
import RecordScreen from './main_screen/RecordScreen';
import SeatListScreen from './main_screen/SeatListScreen';

const LibraryMainScreen = ({route: {params}}: LibraryMainScreenProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const setIsFocusedLibraryScreen = useSetAtom(isFocusedLibraryAtom);

  const initialStatus = useMemo(
    () => (params?.status ?? 'MY_SEAT') satisfies LibraryTabsType,
    [params?.status],
  );
  const initialIndex = useMemo(
    () => Object.keys(LibraryTabsEnum).findIndex(i => i.match(initialStatus)),
    [initialStatus],
  );
  const [index, setIndex] = useState(initialIndex);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // '이용 중인 좌석' API의 auto refetch를 위해 도서관 화면의 isFocused 상태를 저장합니다.
  useEffect(() => {
    setIsFocusedLibraryScreen(isFocused);
  }, [isFocused, setIsFocusedLibraryScreen]);

  return (
    <>
      <Header
        label="도서관"
        onPressBackButton={handleGoBack}
        style={{paddingTop: insets.top}}
      />
      <TabView index={index} setIndex={setIndex}>
        <TabView.Screen
          tabKey="MY_SEAT"
          tabTitle={LibraryTabsEnum.MY_SEAT}
          component={<MySeatScreen redirectSeatList={() => setIndex(1)} />}
        />
        <TabView.Screen
          tabKey="SEAT_LIST"
          tabTitle={LibraryTabsEnum.SEAT_LIST}
          component={<SeatListScreen />}
        />
        <TabView.Screen
          tabKey="RECORD"
          tabTitle={LibraryTabsEnum.RECORD}
          component={<RecordScreen />}
        />
      </TabView>
    </>
  );
};

export default LibraryMainScreen;
