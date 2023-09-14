import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {
  AccountFlowStatusType,
  accountFlowStatusAtom,
} from '../../../atoms/account';

import SetNicknameScreen from '../common/SetNicknameScreen';
import AccountIntegrationScreen from '../common/AccountIntegrationScreen';

const ExistedUserScreenContainer = () => {
  const accountStatus = useAtomValue(accountFlowStatusAtom);
  const handleExistedUserScreen = (accountStatus: AccountFlowStatusType) => {
    switch (accountStatus.stepStatus.step) {
      case 0:
        return <AccountIntegrationScreen />;
      case 1:
        return <SetNicknameScreen />;
      default:
        return <AccountIntegrationScreen />;
    }
  };
  return (
    <View style={{flex: 1}}>{handleExistedUserScreen(accountStatus)}</View>
  );
};

export default ExistedUserScreenContainer;
