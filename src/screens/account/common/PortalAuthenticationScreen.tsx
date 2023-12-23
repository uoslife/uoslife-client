import React, {useRef, useState} from 'react';
import {Platform, Pressable, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Txt, Button} from '@uoslife/design-system';

import KeyboardManager from 'react-native-keyboard-manager';
import {useThrottle} from '@uoslife/react';
import Header from '../../../components/molecules/common/header/Header';
import Input from '../../../components/molecules/common/forms/input/Input';
import InputProps from '../../../components/molecules/common/forms/input/Input.type';

import {RootTabNavigationProps} from '../../../navigators/RootBottomTapNavigator';

import {CoreAPI} from '../../../api/services';
import {ErrorResponseType} from '../../../api/services/type';
import storage from '../../../storage';

import useAccountFlow from '../../../hooks/useAccountFlow';
import useIsCurrentScreen from '../../../hooks/useIsCurrentScreen';
import customShowToast from '../../../configs/toast';
import UserService from '../../../services/user';
import useUserState from '../../../hooks/useUserState';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(true);
}

type PortalVerificationStatusMessageType =
  | 'BEFORE_VERIFICATION'
  | 'UNFILLED_INPUT'
  | 'MISMATCHED';
type InputValueType = {id: string; password: string};

const PortalAuthenticationScreen = () => {
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput | null>(null);

  const navigation = useNavigation<RootTabNavigationProps>();
  const [isNotAccountFlow] = useIsCurrentScreen([
    'StudentId_PortalAuthentication',
    'Mypage_portalAuthentication',
  ]);

  const {changeAccountFlow, resetAccountFlow} = useAccountFlow();
  const {setUserInfo} = useUserState();

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
      case 'UNFILLED_INPUT':
        return '아이디 또는 비밀번호를 모두 입력해주세요.';
      case 'MISMATCHED':
        return '아이디 또는 비밀번호를 확인해주세요.';
      default:
        return '';
    }
  };
  const handleInputStatus = (
    status: PortalVerificationStatusMessageType,
  ): InputProps['status'] => {
    switch (status) {
      case 'BEFORE_VERIFICATION':
        return 'default';
      case 'UNFILLED_INPUT':
        return 'error';
      case 'MISMATCHED':
        return 'error';
      default:
        return 'default';
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
    changeAccountFlow({commonFlowName: 'FINISH'});
  };

  const handleSubmit = useThrottle(async () => {
    if (!(inputValue.id && inputValue.password)) {
      setMessageStatus('UNFILLED_INPUT');
      return;
    }
    try {
      await CoreAPI.portalVerification({
        username: inputValue.id,
        password: inputValue.password,
      });
      await UserService.updateUserInfo(setUserInfo);
      if (isNotAccountFlow) {
        customShowToast('portalAuthenticationSuccess');
        navigation.goBack();
        return;
      }
      changeAccountFlow({commonFlowName: 'FINISH'});
    } catch (err) {
      const error = err as ErrorResponseType;
      if (error.status !== 500) setMessageStatus('MISMATCHED');
    }
  });

  const handlePressHeaderBackButton = () => {
    if (isNotAccountFlow) {
      navigation.goBack();
      return;
    }
    storage.set('isLoggedIn', true);
    resetAccountFlow();
  };

  return (
    <S.screenContainer
      style={{paddingTop: insets.top, paddingBottom: insets.bottom + 8}}>
      <Header
        label="포털 계정 연동"
        onPressBackButton={handlePressHeaderBackButton}
      />
      <S.portalAuthenticationContainer>
        <View style={{gap: 24}}>
          <View style={{gap: 8}}>
            <Txt
              typograph="headlineMedium"
              color="grey190"
              label={'서울시립대학교\n포털 계정 연동하기'}
            />
            <Txt
              typograph="bodyMedium"
              color="grey130"
              label={
                '포털 계정 연동을 통해 다양한 기능을 이용할 수 있습니다.\n계정 정보는 안전한 암호화 방식으로 서버에 저장됩니다.'
              }
            />
            <Txt
              typograph="bodyMedium"
              color="grey130"
              label="졸업생은 현재 연동이 불가능합니다."
            />
          </View>
          <View>
            <Input
              onChangeText={text => onChangeText(text, 'id')}
              onPress={() => onPressInputDelete('id')}
              value={inputValue.id}
              label="포털 아이디"
              status={handleInputStatus(messageStatus)}
              placeholder="아이디"
              onSubmitEditing={() => passwordRef.current?.focus()}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              onChangeText={text => onChangeText(text, 'password')}
              onPress={() => onPressInputDelete('password')}
              value={inputValue.password}
              secureTextEntry
              label="포털 비밀번호"
              status={handleInputStatus(messageStatus)}
              statusMessage={handleInputStatusMessage(messageStatus)}
              placeholder="비밀번호"
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>
        </View>
        <S.bottomContainer>
          {!isNotAccountFlow && (
            <S.postponePortalAuthButton>
              <Pressable onPress={handlePostponePortalAuth}>
                <Txt
                  label="포털 연동 다음에 하기"
                  color="grey130"
                  typograph="bodySmall"
                />
              </Pressable>
            </S.postponePortalAuthButton>
          )}
          <Button
            label="확인"
            onPress={handleSubmit}
            isEnabled={!!(inputValue.id && inputValue.password)}
            isFullWidth
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
