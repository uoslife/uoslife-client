import {createStackNavigator} from '@react-navigation/stack';

import {GraduateCreditStackParamList} from './types/graduateCredit';
// import PortalAuthenticationScreen from '../../account/components/screens/portal_account/PortalAuthenticationScreen';
import GraduateCreditScreen from '../components/screens/GraduateCreditScreen';
import CreditDetailScreen from '../components/screens/CreditDetailScreen';

const Stack = createStackNavigator<GraduateCreditStackParamList>();

const GraduateCreditStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="graduate_credit_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="graduate_credit_main"
        component={GraduateCreditScreen}
      />
      <Stack.Screen
        name="graduate_credit_detail"
        component={CreditDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default GraduateCreditStackNavigator;
