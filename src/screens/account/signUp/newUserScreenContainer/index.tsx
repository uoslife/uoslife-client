import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountFlowType, accountFlowAtom} from '../../../../store/account';

import SetNicknameScreen from '../../common/SetNicknameScreen';

const NewUserScreenContainer = () => {
  const accountFlow = useAtomValue(accountFlowAtom);
  const handleNewUserScreen = (accountFlow: AccountFlowType) => {
    switch (accountFlow.signUpFlow.step) {
      case 0:
        return <SetNicknameScreen />;
      default:
        return <SetNicknameScreen />;
    }
  };
  return <View style={{flex: 1}}>{handleNewUserScreen(accountFlow)}</View>;
};

export default NewUserScreenContainer;
