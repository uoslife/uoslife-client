import {ScrollView} from 'react-native';
import AccountMainScreen from './main/AccountMainScreen';
import SMSVerificationScreen from './sms_authentication/SMSVerificationScreen';
import SetNicknameScreen from './sign_up/SetNicknameScreen';
import PortalAuthenticationScreen from './portal_account/PortalAuthenticationScreen';
import AccountFinishInfoScreen from './end/AccountFinishInfoScreen';
import useAccountFlow from '../../hooks/useAccountFlow';
// import AccountFlowStatusGuideForDev from './dev/AccountFlowStatusGuideForDev';

const AccountScreenContainer = () => {
  const {accountFlow} = useAccountFlow();

  const handleAccountScreen = () => {
    switch (accountFlow) {
      case 'MAIN':
        return <AccountMainScreen />;
      case 'SMS_AUTHENTICATION':
        return <SMSVerificationScreen />;
      case 'SIGN_UP':
        return <SetNicknameScreen />;
      case 'PORTAL_ACCOUNT':
        return <PortalAuthenticationScreen />;
      case 'END':
        return <AccountFinishInfoScreen />;
      default:
        return <AccountMainScreen />;
    }
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
      {handleAccountScreen()}
      {/* <AccountFlowStatusGuideForDev /> */}
    </ScrollView>
  );
};
export default AccountScreenContainer;
