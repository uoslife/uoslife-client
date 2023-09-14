import React from 'react';
import {atom, useAtomValue} from 'jotai';

import VerificationScreen from './common/VerificationScreen';
import styled from '@emotion/native';
import AccountMainScreen from './AccountMainScreen';
import NewUserScreen from './newUserScreenContainer';
import ExistedUserScreen from './existedUserScreenContainer';
import PortalAuthScreenContainer from './portalAuthScreenContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  AccountFlowStatusType,
  accountFlowStatusAtom,
} from '../../atoms/account';

const AccountScreenContainer = () => {
  const accountStatus = useAtomValue(accountFlowStatusAtom);

  const handleAccountScreen = (accountStatus: AccountFlowStatusType) => {
    if (accountStatus.baseStatus === 'DEFAULT') return <AccountMainScreen />;
    if (accountStatus.portalStatus.isPortalStep)
      return <PortalAuthScreenContainer />;

    switch (accountStatus.stepStatus.userType) {
      case 'NONE':
        return <VerificationScreen />;
      case 'NEW':
        return <NewUserScreen />;
      case 'EXISTED':
        return <ExistedUserScreen />;
      default:
        return <VerificationScreen />;
    }
  };
  return (
    <S.AccountContainer contentContainerStyle={{flex: 1}}>
      {handleAccountScreen(accountStatus)}
    </S.AccountContainer>
  );
};
export default AccountScreenContainer;

const S = {
  AccountContainer: styled.ScrollView``,
};
