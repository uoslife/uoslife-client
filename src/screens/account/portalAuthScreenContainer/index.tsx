import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountStatusType, accountStatusAtom} from '..';

import PortalAuthenticationScreen from './PortalAuthenticationScreen';

const portalAuthScreenContainer = () => {
  const accountStatus = useAtomValue(accountStatusAtom);
  const handlePortalAuthScreen = (accountStatus: AccountStatusType) => {
    switch (accountStatus.portalStatus.step) {
      case 0:
        return <PortalAuthenticationScreen />;
      case 1:
        return; // 회원가입 완료 안내 페이지
      default:
        return <PortalAuthenticationScreen />;
    }
  };
  return <View>{handlePortalAuthScreen(accountStatus)}</View>;
};

export default portalAuthScreenContainer;
