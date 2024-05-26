import {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  LibraryRoomStatusTabsEnum,
  LibraryRoomStatusTabsType,
} from '../../../constants/libraryTabs';
import {LibraryRoomStatusScreenProps} from '../../../../../navigators/types/library';

import Header from '../../../../../components/molecules/common/header/Header';
import TabView from '../../../../../components/molecules/common/tab_view/TabView';
import LibraryRoomStatus from '../../molecules/LibraryRoomStatus';

const LibraryRoomStatusScreen = ({
  route: {params},
}: LibraryRoomStatusScreenProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const initialRoomType = (params?.roomType ??
    'CENTRAL') satisfies LibraryRoomStatusTabsType;

  const initialIndex = useMemo(
    () =>
      Object.keys(LibraryRoomStatusTabsEnum).findIndex(i =>
        i.match(initialRoomType),
      ),
    [initialRoomType],
  );
  const [index, setIndex] = useState(initialIndex);
  return (
    <>
      <Header
        label="도서관"
        onPressBackButton={handleGoBack}
        style={{paddingTop: insets.top}}
      />
      <TabView index={index} setIndex={setIndex}>
        <TabView.Screen
          tabKey="CENTRAL"
          tabTitle={LibraryRoomStatusTabsEnum.CENTRAL}
          component={<LibraryRoomStatus roomType="CENTRAL" />}
        />
        <TabView.Screen
          tabKey="LAW"
          tabTitle={LibraryRoomStatusTabsEnum.LAW}
          component={<LibraryRoomStatus roomType="LAW" />}
        />
        <TabView.Screen
          tabKey="ECONOMY"
          tabTitle={LibraryRoomStatusTabsEnum.ECONOMY}
          component={<LibraryRoomStatus roomType="ECONOMY" />}
        />
      </TabView>
    </>
  );
};

export default LibraryRoomStatusScreen;
