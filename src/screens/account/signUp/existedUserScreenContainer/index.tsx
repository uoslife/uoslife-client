import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountFlowType, accountFlowAtom} from '../../../../store/account';

import SetNicknameScreen from '../../common/SetNicknameScreen';
import AccountIntegrationScreen from '../../common/AccountIntegrationScreen';

const ExistedUserScreenContainer = () => {
  const accountFlow = useAtomValue(accountFlowAtom);
  const handleExistedUserScreen = (accountFlow: AccountFlowType) => {
    switch (accountFlow.signUpFlow.step) {
      case 0:
        return <AccountIntegrationScreen />;
      case 1:
        return <SetNicknameScreen />;
      default:
        return <AccountIntegrationScreen />;
    }
  };
  return <View style={{flex: 1}}>{handleExistedUserScreen(accountFlow)}</View>;
};

export default ExistedUserScreenContainer;
