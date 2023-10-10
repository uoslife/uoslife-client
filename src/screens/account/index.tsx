import React from 'react';
import {useAtomValue} from 'jotai';
import styled from '@emotion/native';

import VerificationScreen from './common/VerificationScreen';
import AccountMainScreen from './AccountMainScreen';
import NewUserScreen from './newUserScreenContainer';
import ExistedUserScreen from './existedUserScreenContainer';
import PortalAuthScreenContainer from './portalAuthScreenContainer';

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
    }
  };
  return (
    <S.AccountContainer contentContainerStyle={{flexGrow: 1}}>
      {handleAccountScreen(accountStatus)}
    </S.AccountContainer>
  );
};
export default AccountScreenContainer;

const S = {
  AccountContainer: styled.ScrollView``,
};
