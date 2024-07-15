import {createStackNavigator} from '@react-navigation/stack';

import {AcademicCalendarStackParamList} from '../types/AcademicCalendar';
import AcademicCalendarScreen from '../screens/AcademicCalendarScreen';
import AcademicCalendarSearchScreen from '../screens/AcademicCalendarSearchScreen';

const Stack = createStackNavigator<AcademicCalendarStackParamList>();

const AcademicCalendarStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="academic_calendar"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="academic_calendar"
        component={AcademicCalendarScreen}
      />
      <Stack.Screen
        name="academic_calendar_search"
        component={AcademicCalendarSearchScreen}
      />
    </Stack.Navigator>
  );
};

export default AcademicCalendarStackNavigator;
