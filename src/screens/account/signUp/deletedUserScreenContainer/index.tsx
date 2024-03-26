import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {accountFlowAtom} from '../../../../store/account';

import SetNicknameScreen from '../../common/SetNicknameScreen';
import DeletedUserScreen from '../../common/DeletedUserScreen';

const DeletedUserScreenContainer = () => {
  const accountFlow = useAtomValue(accountFlowAtom);
  const handleDeletedUserScreen = () => {
    switch (accountFlow.signUpFlow.step) {
      case 0:
        return <DeletedUserScreen />;
      case 1:
        return <SetNicknameScreen />;
      default:
        return <DeletedUserScreen />;
    }
  };
  return <View style={{flex: 1}}>{handleDeletedUserScreen()}</View>;
};

export default DeletedUserScreenContainer;
