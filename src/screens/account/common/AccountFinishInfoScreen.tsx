import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import AnimatedPlayer from 'react-native-animated-webp';
import styled from '@emotion/native';

import storage from '../../../storage';
import useAccountFlow from '../../../hooks/useAccountFlow';

const REDIRECT_TO_MAIN_TIME = 4 * 1000;

const useAutoRedirect = (time: number, callback: () => void) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, time);
    return () => clearInterval(timeout);
  }, [callback, time]);
};

const AccountFinishInfoScreen = () => {
  const {resetAccountFlow} = useAccountFlow();
  const useAutoRedirectCallback = () => {
    storage.set('isLoggedIn', true);
    resetAccountFlow();
  };

  useAutoRedirect(REDIRECT_TO_MAIN_TIME, useAutoRedirectCallback);

  return (
    <S.screenContainer>
      <AnimatedPlayer
        thumbnailSource={require('../../../assets/animations/uoslifeLogo.gif')}
        animatedSource={require('../../../assets/animations/uoslifeLogo.gif')}
        style={{width: 400, height: 300}}
      />
      <Txt
        label="시대생 회원이 되신 것을 축하해요!"
        color="grey130"
        typograph="titleLarge"
      />
    </S.screenContainer>
  );
};

export default AccountFinishInfoScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    top: -50px;
  `,
};
