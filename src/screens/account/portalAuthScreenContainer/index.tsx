import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountStatusType, accountStatusAtom} from '..';

import PortalAuthenticationScreen from './PortalAuthenticationScreen';
import AccountFinishInfoScreen from './AccountFinishInfoScreen';

const portalAuthScreenContainer = () => {
  const accountStatus = useAtomValue(accountStatusAtom);
  const handlePortalAuthScreen = (accountStatus: AccountStatusType) => {
    switch (accountStatus.portalStatus.step) {
      case 0:
        return <PortalAuthenticationScreen />;
      case 1:
        return <AccountFinishInfoScreen />;
      default:
        return <PortalAuthenticationScreen />;
    }
  };
  return <View style={{flex: 1}}>{handlePortalAuthScreen(accountStatus)}</View>;
};

export default portalAuthScreenContainer;
