import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSetAtom} from 'jotai';
import {
  accountFlowInitStatus,
  accountFlowStatusAtom,
} from '../../../atoms/account';
import {useUserStatus} from '../../../atoms/user';
import AnimatedPlayer from 'react-native-animated-webp';

const REDIRECT_TO_MAIN_TIME = 3 * 1000;

const useAutoRedirect = (time: number, callback: () => void) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, time);
    return () => clearInterval(timeout);
  }, []);
};

const AccountFinishInfoScreen = () => {
  const setAccontFlowStatus = useSetAtom(accountFlowStatusAtom);
  const {setIsLoggedIn} = useUserStatus();

  const useAutoRedirectCallback = () => {
    setIsLoggedIn(true);
    setAccontFlowStatus(accountFlowInitStatus);
  };

  useAutoRedirect(REDIRECT_TO_MAIN_TIME, useAutoRedirectCallback);

  return (
    <View style={{paddingTop: 400, alignItems: 'center'}}>
      <AnimatedPlayer
        thumbnailSource={require('../../../assets/animations/uoslifeLogo.webp')}
        animatedSource={require('../../../assets/animations/uoslifeLogo.webp')}
        autoplay={true}
        loop={false}
        style={{width: 350, height: 350}}
      />
    </View>
  );
};

export default AccountFinishInfoScreen;
