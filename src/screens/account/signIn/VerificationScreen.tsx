import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import styled from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';
import {useSetAtom} from 'jotai';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTimer} from '@uoslife/react';
import Header from '../../../components/molecules/common/header/Header';
import Input from '../../../components/molecules/common/forms/input/Input';
import {existedAccountInfoAtom} from '../../../atoms/account';
import {CoreAPI} from '../../../api/services';
import showErrorMessage from '../../../utils/showErrorMessage';
import storeToken from '../../../utils/storeToken';
import {ErrorResponseType} from '../../../api/services/type';
import {SignInRes} from '../../../api/services/core/auth/authAPI.type';
import UserService from '../../../services/user';
import useAccountFlow from '../../../hooks/useAccountFlow';

const MAX_SMS_TRIAL_COUNT = 5;
const MAX_PHONE_NUMBER_LENGTH = 11;
const MAX_VERIFICATION_CODE_LENGTH = 6;

const VERIFICATION_TIMER_MIN = 3;
const VERIFICATION_TIMER_SEC = 0;

const VERIFICATION_RETRY_TERM = 60 * 1000;

// TODO: unable되었을 때 눌리는 문제 해결필요
// TODO: Time Expired되었을 때 에러 대응

type InputStatusMessageType =
  | 'DEFAULT'
  | 'NOT_MATCHING_CODE'
  | 'REQUEST_EXCEED'
  | 'TIME_EXPIRED';

const VerificationScreen = () => {
  const insets = useSafeAreaInsets();

  const setExistedAccountInfo = useSetAtom(existedAccountInfoAtom);
  const {changeAccountFlow, resetAccountFlow} = useAccountFlow();

  const [inputValue, setInputValue] = useState('');
  const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

  const [inputMessageStatus, setInputMessageStatus] =
    useState<InputStatusMessageType>('DEFAULT');

  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isRetryTerm, setIsRetryTerm] = useState(false);

  // 공통
  const handleInputStatusMessage = (status: InputStatusMessageType) => {
    switch (status) {
      case 'DEFAULT':
        return '인증번호가 오지 않나요?';
      case 'NOT_MATCHING_CODE':
        return '입력하신 인증번호가 일치하지 않습니다.';
      case 'REQUEST_EXCEED':
        return '1일 인증 요청 가능 횟수(5회)를 초과하였습니다.';
      case 'TIME_EXPIRED':
        return '요청된 시간이 만료되었습니다.';
    }
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
    setInputMessageStatus('DEFAULT');
  };

  const onPressInputDelete = () => {
    setInputValue('');
    setInputMessageStatus('DEFAULT');
  };
  const handleButtonIsEnable = () => {
    if (
      isVerificationCodeSent &&
      inputValue.length === MAX_VERIFICATION_CODE_LENGTH
    )
      return true;
    return inputValue.length === MAX_PHONE_NUMBER_LENGTH;
  };

  const handleHeaderBackButton = () => {
    if (isVerificationCodeSent) setIsVerificationCodeSent(false);

    resetAccountFlow();
  };

  // 전화번호 입력 페이지
  const handleOnPressRequestCode = async () => {
    if (isRetryTerm) {
      Alert.alert('제한시간(1분)이 지난 후에 다시 요청해주세요.');
      return;
    }
    const currentInputLength = inputValue.length;
    if (currentInputLength < MAX_PHONE_NUMBER_LENGTH) return;
    try {
      const smsVerificationRes = await CoreAPI.sendSMSVerificationCode({
        mobile: inputValue,
      });
      setStoredPhoneNumber(smsVerificationRes.mobile);
      setIsVerificationCodeSent(true);
      setInputValue('');
      setIsRetryTerm(true);
      startTimer();
    } catch (error) {
      // TODO: error인 경우 수정
      showErrorMessage(error);
      setStoredPhoneNumber(inputValue);
      setIsVerificationCodeSent(true);
      setInputValue('');
    }
  };

  // 인증번호 입력 페이지
  const handleOnPressVerifyIdentify = async () => {
    const currentInputLength = inputValue.length;
    if (currentInputLength < MAX_VERIFICATION_CODE_LENGTH) return;

    try {
      const signInRes = await CoreAPI.signIn({
        mobile: storedPhoneNumber,
        code: inputValue,
      });
      const {accessToken, refreshToken} = signInRes.token;
      await UserService.onRegister({accessToken, refreshToken});
      resetAccountFlow();
    } catch (err) {
      const error = err as SignInRes;
      console.log(error);
      const {tempToken} = error.token;
      storeToken({tempToken});
      switch (error.userStatus) {
        case 'DELETED':
          changeAccountFlow({
            commonFlowName: 'SIGNUP',
            signUpUser: 'DELETED',
          });
          break;

        case 'MIGRATION_NEEDED':
          setExistedAccountInfo(
            error.migrationUserInfo.map(item => {
              return {...item, isSelected: false};
            }),
          );
          changeAccountFlow({
            commonFlowName: 'SIGNUP',
            signUpUser: 'MIGRATION',
          });
          break;

        case 'NOT_REGISTERED':
          setExistedAccountInfo(
            error.migrationUserInfo.map(item => {
              return {...item, isSelected: false};
            }),
          );
          changeAccountFlow({
            commonFlowName: 'SIGNUP',
            signUpUser: 'NEW',
          });
          break;
      }
    }
    setIsVerificationCodeSent(false); // state 초기화
    setStoredPhoneNumber(''); // state 초기화
  };

  const {currentTime, isFinish, startTimer, resetTimer} = useTimer({
    initMin: VERIFICATION_TIMER_MIN,
    initSec: VERIFICATION_TIMER_SEC,
    autoStart: false,
  });

  useEffect(() => {
    if (isFinish) setInputMessageStatus('TIME_EXPIRED');
  }, [isFinish]);

  useEffect(() => {
    if (!isRetryTerm) return () => null;

    const retryTimeout = setTimeout(() => {
      setIsRetryTerm(false);
    }, VERIFICATION_RETRY_TERM);
    return () => clearTimeout(retryTimeout);
  }, [isRetryTerm]);

  const handleOnPressRetryButton = async () => {
    if (isRetryTerm) {
      Alert.alert('제한시간(1분)이 지난 후에 다시 요청해주세요.');
      return;
    }
    try {
      await CoreAPI.sendSMSVerificationCode({
        mobile: storedPhoneNumber,
      });
      resetTimer();
      startTimer();
      setIsRetryTerm(true);
    } catch (err) {
      const error = err as ErrorResponseType;
      if (error.code === 'S02') setInputMessageStatus('REQUEST_EXCEED');
      setInputMessageStatus('REQUEST_EXCEED');
    }
  };

  return (
    <S.screenContainer
      style={{paddingTop: insets.top, paddingBottom: insets.bottom + 8}}>
      <Header
        label="휴대폰 본인인증"
        onPressBackButton={handleHeaderBackButton}
      />
      <S.verificationContainer>
        <View style={{gap: 32}}>
          <View style={{gap: 8}}>
            <Txt
              typograph="headlineMedium"
              color="grey190"
              label={
                isVerificationCodeSent
                  ? '인증번호를 입력해주세요.'
                  : '전화번호를 입력해주세요.'
              }
            />
            <Txt
              typograph="bodyMedium"
              color="grey190"
              label="인증번호 전송은 1일 5회로 제한됩니다."
            />
          </View>
          <Input
            onChangeText={onChangeText}
            maxLength={
              isVerificationCodeSent
                ? MAX_VERIFICATION_CODE_LENGTH
                : MAX_PHONE_NUMBER_LENGTH
            }
            onPress={onPressInputDelete}
            keyboardType="numeric"
            value={inputValue}
            label={isVerificationCodeSent ? '인증번호' : '전화번호'}
            statusMessage={
              isVerificationCodeSent
                ? handleInputStatusMessage(inputMessageStatus)
                : undefined
            }
            status={inputMessageStatus === 'DEFAULT' ? 'default' : 'error'}
            placeholder={isVerificationCodeSent ? '000000' : '01012345678'}
            showTimer={isVerificationCodeSent}
            currentTime={currentTime}>
            {isVerificationCodeSent && (
              <S.requestRetryButton onPressIn={handleOnPressRetryButton}>
                <Txt label="재전송" color="grey190" typograph="labelMedium" />
              </S.requestRetryButton>
            )}
          </Input>
        </View>
        <Button
          label={isVerificationCodeSent ? '본인 인증하기' : '인증번호 받기'}
          onPress={
            isVerificationCodeSent
              ? handleOnPressVerifyIdentify
              : handleOnPressRequestCode
          }
          isEnabled={handleButtonIsEnable()}
          isFullWidth
        />
      </S.verificationContainer>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,

  verificationContainer: styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px 16px 0;
  `,

  requestRetryButton: styled.Pressable`
    position: absolute;
    bottom: 8px;
    right: 12px;
  `,
};

export default VerificationScreen;
