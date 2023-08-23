import React, {useState} from 'react';
import {
  View,
  Text,
  NativeModules,
  Platform,
  StatusBar,
  Button,
} from 'react-native';
import {atom, useAtomValue} from 'jotai';

import VerificationScreen from './common/VerificationScreen';
import styled from '@emotion/native';
import AccountMainScreen from './AccountMainScreen';
import NewUserScreen from './newUserScreenContainer';
import ExistedUserScreen from './existedUserScreenContainer';
import PortalAuthScreenContainer from './portalAuthScreenContainer';

type BaseStatusType = 'DEFAULT' | 'ONPROGRESS';
type UserType = 'NONE' | 'NEW' | 'EXISTED';
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
  const {StatusBarManager} = NativeModules;
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'android'
      ? StatusBar.currentHeight
      : StatusBarManager.HEIGHT;
  // TODO: status bar height 구하는 로직 hook으로 뺴기

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
      style={{paddingTop: STATUS_BAR_HEIGHT}}
      contentContainerStyle={{flexGrow: 1}}>
      {handleAccountScreen(accountStatus)}
    </S.AccountContainer>
  );
};
export default AccountScreenContainer;

const S = {
  AccountContainer: styled.ScrollView``,
};
