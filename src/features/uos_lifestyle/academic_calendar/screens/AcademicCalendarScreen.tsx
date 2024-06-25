import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
<<<<<<< HEAD:src/features/uos_lifestyle/academic_calendar/AcademicCalendarScreen.tsx
import Header from '../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../navigators/types/rootStack';
// import {useState} from 'react';
=======
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
>>>>>>> feature/tf-academic-calendar:src/features/uos_lifestyle/academic_calendar/screens/AcademicCalendarScreen.tsx

const AcademicCalendarScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();

  // const currentDate: Date = new Date();
  // const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);

  // const handlePreviousMonth = () => {
  //   setMonth(month === 1 ? 1 : month - 1);
  // };
  // const handleNextMonth = () => {
  //   setMonth(month === 12 ? 12 : month + 1);
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
