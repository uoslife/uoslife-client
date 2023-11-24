import React from 'react';
import {ScrollView, View} from 'react-native';
import {useAtomValue} from 'jotai';

import {AccountFlowType, accountFlowAtom} from '../../../store/account';

import NewUserScreen from './newUserScreenContainer';
import ExistedUserScreen from './existedUserScreenContainer';
import DeletedUserScreen from './deletedUserScreenContainer';

const SignUpScreenContainer = () => {
  const accountFlow = useAtomValue(accountFlowAtom);

  const handleSignUpScreen = (accountFlow: AccountFlowType) => {
    switch (accountFlow.signUpFlow.signUpUser) {
      case 'NEW':
        return <NewUserScreen />;
      case 'MIGRATION':
        return <ExistedUserScreen />;
      case 'NOT_SELECTED':
        return <View />;
      case 'DELETED':
        return <DeletedUserScreen />;
      default:
        return <View />;
    }
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
      {handleSignUpScreen(accountFlow)}
    </ScrollView>
  );
};
export default SignUpScreenContainer;
