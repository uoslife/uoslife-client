import React from 'react';
import {atom, useAtomValue} from 'jotai';

import VerificationScreen from './common/VerificationScreen';
import styled from '@emotion/native';
import AccountMainScreen from './AccountMainScreen';
import NewUserScreen from './newUserScreenContainer';
import ExistedUserScreen from './existedUserScreenContainer';
import PortalAuthScreenContainer from './portalAuthScreenContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type BaseStatusType = 'DEFAULT' | 'ONPROGRESS';
export type UserType = 'NONE' | 'NEW' | 'EXISTED';
type StepStatusType<T extends UserType> = {
  userType: T;
  step: number;
};
type PortalStatusType = {isPortalStep: boolean; step: number};
export type AccountStatusType = {
  baseStatus: BaseStatusType;
  stepStatus: StepStatusType<UserType>;
  portalStatus: PortalStatusType;
};

export const accountStatusAtom = atom<AccountStatusType>({
  baseStatus: 'DEFAULT',
  stepStatus: {userType: 'NONE', step: 0},
  portalStatus: {isPortalStep: false, step: 0},
});

const AccountScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const accountStatus = useAtomValue(accountStatusAtom);

  const handleAccountScreen = (accountStatus: AccountStatusType) => {
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
    <S.AccountContainer
      contentContainerStyle={{flex: 1}}
      style={{paddingTop: insets.top}}>
      {handleAccountScreen(accountStatus)}
    </S.AccountContainer>
  );
};
export default AccountScreenContainer;

const S = {
  AccountContainer: styled.ScrollView``,
};
