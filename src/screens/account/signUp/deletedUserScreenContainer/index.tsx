import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountFlowType, accountFlowAtom} from '../../../../atoms/account';

import SetNicknameScreen from '../../common/SetNicknameScreen';
import DeletedUserScreen from '../../common/DeletedUserScreen';

const DeletedUserScreenContainer = () => {
  const accountFlow = useAtomValue(accountFlowAtom);
  const handleDeletedUserScreen = (accountFlow: AccountFlowType) => {
    switch (accountFlow.signUpFlow.step) {
      case 0:
        return <DeletedUserScreen />;
      case 1:
        return <SetNicknameScreen />;
      default:
        return <DeletedUserScreen />;
    }
  };
  return <View style={{flex: 1}}>{handleDeletedUserScreen(accountFlow)}</View>;
};

export default DeletedUserScreenContainer;
