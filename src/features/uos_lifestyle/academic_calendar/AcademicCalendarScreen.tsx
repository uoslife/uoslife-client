import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../navigators/types/rootStack';
// import {useState} from 'react';
// import FilterButtonGroup from './components/FilterButtonGroup';
// import MonthlyFilter from './components/MontlyFilter';

const AcademicCalendarScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();

  // //모든일정 : 테스트용 월 설정, 어떻게 할 것인지 논의
  // const [month, setMonth] = useState<string>('5월');
  // const handlePreviousMonth = () => {
  //   setMonth('4월');
  // };
  // const handleNextMonth = () => {
  //   setMonth('6월');
  // };

  return (
    <View>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="학사일정"
        onPressBackButton={() => navigation.goBack()}
      />
    </View>
  );
};

export default AcademicCalendarScreen;
