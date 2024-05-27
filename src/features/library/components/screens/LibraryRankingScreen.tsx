import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../../../../components/molecules/common/header/Header';
import TabView from '../../../../components/molecules/common/tab_view/TabView';
import {LibraryRankingTabsEnum} from '../../constants/libraryTabs';
import LibraryRanking from '../molecules/ranking/LibraryRanking';

const LibraryRankingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [index, setIndex] = useState(0);
  return (
    <>
      <Header
        label="도서관 순위"
        onPressBackButton={handleGoBack}
        style={{
          paddingTop: insets.top,
        }}
      />
      <TabView index={index} setIndex={setIndex}>
        <TabView.Screen
          tabKey="DAY"
          tabTitle={LibraryRankingTabsEnum.DAY}
          component={<LibraryRanking duration="DAY" />}
        />
        <TabView.Screen
          tabKey="WEEK"
          tabTitle={LibraryRankingTabsEnum.WEEK}
          component={<LibraryRanking duration="WEEK" />}
        />
        <TabView.Screen
          tabKey="MONTH"
          tabTitle={LibraryRankingTabsEnum.MONTH}
          component={<LibraryRanking duration="MONTH" />}
        />
      </TabView>
    </>
  );
};

export default LibraryRankingScreen;
