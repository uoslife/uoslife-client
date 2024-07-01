import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AcademicCalendarStackParamList = {
  academic_calendar?: undefined;
  academic_calendar_search: undefined;
};

// navigation props
export type AcademicCalendarNavigationProp =
  NativeStackNavigationProp<AcademicCalendarStackParamList>;
