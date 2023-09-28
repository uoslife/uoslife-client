import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {
  AccountFlowStatusType,
  accountFlowStatusAtom,
} from '../../../atoms/account';

import PortalAuthenticationScreen from './PortalAuthenticationScreen';
import AccountFinishInfoScreen from './AccountFinishInfoScreen';

const portalAuthScreenContainer = () => {
  const accountStatus = useAtomValue(accountFlowStatusAtom);
  const handlePortalAuthScreen = (accountStatus: AccountFlowStatusType) => {
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
