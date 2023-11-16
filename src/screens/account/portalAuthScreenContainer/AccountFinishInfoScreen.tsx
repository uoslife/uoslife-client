import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {useSetAtom} from 'jotai';
import AnimatedPlayer from 'react-native-animated-webp';
import styled from '@emotion/native';
import {
  accountFlowInitStatus,
  accountFlowStatusAtom,
} from '../../../atoms/account';
import storage from '../../../storage';

const REDIRECT_TO_MAIN_TIME = 4 * 1000;

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

  const useAutoRedirectCallback = () => {
    storage.set('isLoggedIn', true);
    setAccontFlowStatus(accountFlowInitStatus);
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
        label="회원가입 축하드립니다!"
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
