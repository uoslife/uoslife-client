import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSetAtom} from 'jotai';
import {Txt, Button} from '@uoslife/design-system';

import Header from '../../../components/header/Header';
import Input from '../../../components/forms/input/Input';
import InputProps from '../../../components/forms/input/Input.type';

import {accountFlowStatusAtom} from '../../../atoms/account';
import {RootNavigationProps} from '../../../navigators/RootStackNavigator';

import {CoreAPI} from '../../../api/services';
import {ErrorResponseType} from '../../../api/services/type';
import {useUserStatus} from '../../../atoms/user';

type PortalVerificationStatusMessageType = 'BEFORE_VERIFICATION' | 'ERROR';
type InputValueType = {id: string; password: string};

const PortalAuthenticationScreen = () => {
  const insets = useSafeAreaInsets();
  const {setIsLoggedIn} = useUserStatus();
  const navigation = useNavigation<RootNavigationProps>();
  const setAccountStatus = useSetAtom(accountFlowStatusAtom);

  const [messageStatus, setMessageStatus] =
    useState<PortalVerificationStatusMessageType>('BEFORE_VERIFICATION');
  const [inputValue, setInputValue] = useState<InputValueType>({
    id: '',
    password: '',
  });

  const handleInputStatusMessage = (
    status: PortalVerificationStatusMessageType,
  ) => {
    switch (status) {
      case 'BEFORE_VERIFICATION':
        return '';
      case 'ERROR':
        return '아이디 또는 비밀번호를 확인해주세요.';
    }
  };
  const handleInputStatus = (
    status: PortalVerificationStatusMessageType,
  ): InputProps['status'] => {
    switch (status) {
      case 'BEFORE_VERIFICATION':
        return 'default';
      case 'ERROR':
        return 'error';
    }
  };

  const onChangeText = (text: string, target: keyof InputValueType) => {
    setInputValue({...inputValue, [target]: text});
    setMessageStatus('BEFORE_VERIFICATION');
  };
  const onPressInputDelete = (target: keyof InputValueType) => {
    onChangeText('', target);
  };

  const handlePostponePortalAuth = () => {
    setAccountStatus(prev => {
      return {
        ...prev,
        portalStatus: {
          isPortalStep: prev.portalStatus.isPortalStep,
          step: 1,
        },
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await CoreAPI.portalVerification({
        username: inputValue.id,
        password: inputValue.password,
      });
      setAccountStatus(prev => {
        return {
          ...prev,
          portalStatus: {
            isPortalStep: prev.portalStatus.isPortalStep,
            step: 1,
          },
        };
      });
    } catch (err) {
      const error = err as ErrorResponseType;
      if (error.code === 'V01') setMessageStatus('ERROR');
      else console.log(error);
    }
  };

  const handlePressBackButton = () => {
    setIsLoggedIn(true);
    navigation.goBack();
  };

  return (
    <S.screenContainer
      style={{paddingTop: insets.top, paddingBottom: insets.bottom + 8}}>
      <Header
        label="포털 계정 연동"
        onPressBackButton={handlePressBackButton}
      />
      <S.portalAuthenticationContainer>
        <View style={{gap: 24}}>
          <View style={{gap: 8}}>
            <Txt
              typograph={'headlineMedium'}
              color={'grey190'}
              label={'서울시립대학교\n포털 계정 연동하기'}
            />
            <Txt
              typograph={'bodyMedium'}
              color={'grey130'}
              label={
                '포털 계정 연동을 통해 다양한 기능을 이용할 수 있습니다.\n계정 정보는 안전한 암호화 방식으로 서버에 저장됩니다.'
              }
            />
          </View>
          <View>
            <Input
              onChangeText={text => onChangeText(text, 'id')}
              onPress={() => onPressInputDelete('id')}
              value={inputValue.id}
              label={'포털 아이디'}
              status={handleInputStatus(messageStatus)}
              placeholder={'아이디'}
            />
            <Input
              onChangeText={text => onChangeText(text, 'password')}
              onPress={() => onPressInputDelete('password')}
              value={inputValue.password}
              secureTextEntry={true}
              label={'포털 비밀번호'}
              status={handleInputStatus(messageStatus)}
              statusMessage={handleInputStatusMessage(messageStatus)}
              placeholder={'비밀번호'}
            />
          </View>
        </View>
        <S.bottomContainer>
          <S.postponePortalAuthButton>
            <Pressable onPress={handlePostponePortalAuth}>
              <Txt
                label={'포털 연동 다음에 하기'}
                color={'grey130'}
                typograph={'bodySmall'}
              />
            </Pressable>
          </S.postponePortalAuthButton>
          <Button
            label={'확인'}
            onPress={handleSubmit}
            isEnabled={!!(inputValue.id && inputValue.password)}
            isFullWidth={true}
          />
        </S.bottomContainer>
      </S.portalAuthenticationContainer>
    </S.screenContainer>
  );
};

export default PortalAuthenticationScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  portalAuthenticationContainer: styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px 16px 0;
  `,
  bottomContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  postponePortalAuthButton: styled.View`
    padding-bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
  `,
};
