import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountStatusType, accountStatusAtom} from '..';

import SetNicknameScreen from '../common/SetNicknameScreen';

const NewUserScreenContainer = () => {
  const accountStatus = useAtomValue(accountStatusAtom);
  const handleNewUserScreen = (accountStatus: AccountStatusType) => {
    switch (accountStatus.stepStatus.step) {
      case 0:
        return <SetNicknameScreen />;
      default:
        return <SetNicknameScreen />;
    }
  };
  return <View>{handleNewUserScreen(accountStatus)}</View>;
};

export default NewUserScreenContainer;
