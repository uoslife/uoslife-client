import React from 'react';
import {useAtomValue} from 'jotai';
import styled from '@emotion/native';

import {AccountFlowType, accountFlowAtom} from '../../atoms/account';

import AccountMainScreen from './main/AccountMainScreen';
import SignUpScreen from './signUp';
import AccountFinishInfoScreen from './common/AccountFinishInfoScreen';
import PortalAuthenticationScreen from './common/PortalAuthenticationScreen';
import VerificationScreen from './signIn/VerificationScreen';
// import AccountFlowStatusGuideForDev from './dev/AccountFlowStatusGuideForDev';

const AccountScreenContainer = () => {
  const accountFlow = useAtomValue(accountFlowAtom);

  const handleAccountScreen = (accountFlow: AccountFlowType) => {
    switch (accountFlow.commonFlow) {
      case 'MAIN':
        return <AccountMainScreen />;
      case 'SIGNIN':
        return <VerificationScreen />;
      case 'SIGNUP':
        return <SignUpScreen />;
      case 'PORTAL_VERIFICATION':
        return <PortalAuthenticationScreen />;
      case 'FINISH':
        return <AccountFinishInfoScreen />;
      default:
        return <AccountMainScreen />;
    }
  };
  return (
    <S.AccountContainer contentContainerStyle={{flexGrow: 1}} bounces={false}>
      {handleAccountScreen(accountFlow)}
      {/* <AccountFlowStatusGuideForDev /> */}
    </S.AccountContainer>
  );
};
export default AccountScreenContainer;

const S = {
  AccountContainer: styled.ScrollView``,
};
