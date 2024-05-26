import {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import styled from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThrottle, useTimer} from '@uoslife/react';

import {captureException} from '@sentry/react-native';
import {AccountAPI} from '../../../../../api/services/account';
import {ErrorResponseType} from '../../../../../api/services/type';
import customShowToast from '../../../../../configs/toast';
import useUserState from '../../../../../hooks/useUserState';
import UserService from '../../../../../services/user';
import storeToken from '../../../../../utils/storeToken';
import useAccountFlow from '../../../hooks/useAccountFlow';
import Header from '../../../../../components/molecules/common/header/Header';
import Input from '../../../../../components/molecules/common/forms/input/Input';

// const MAX_SMS_TRIAL_COUNT = 5;
const MAX_PHONE_NUMBER_LENGTH = 11;
const MAX_VERIFICATION_CODE_LENGTH = 6;

const VERIFICATION_TIMER_MIN = 3;
const VERIFICATION_TIMER_SEC = 0;

const VERIFICATION_RETRY_TERM = 60 * 1000;

// TODO: unable되었을 때 눌리는 문제 해결필요
// TODO: Time Expired되었을 때 에러 대응

type InputStatusMessageType =
  | 'DEFAULT'
  | 'CASE_CODE_NOT_SENT'
  | 'NOT_MATCHING_CODE'
  | 'TIME_EXPIRED'
  | 'TOO_MANY_PHONE_OTP_REQUEST';

const SMSVerificationScreen = () => {
  const insets = useSafeAreaInsets();
  const {setUserInfo} = useUserState();

  const {changeAccountFlow, resetAccountFlow} = useAccountFlow();

  const [currentInputValue, setInput] = useState('');
  const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

  const [inputMessageStatus, setInputMessageStatus] =
    useState<InputStatusMessageType>('DEFAULT');

  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isRetryTerm, setIsRetryTerm] = useState(false);

  // 공통
  const handleInputStatusMessage = (status: InputStatusMessageType) => {
    switch (status) {
      case 'DEFAULT':
        return '';
      case 'CASE_CODE_NOT_SENT':
        return '인증번호가 오지 않나요?';
      case 'NOT_MATCHING_CODE':
        return '입력하신 인증번호가 일치하지 않습니다.';
      case 'TIME_EXPIRED':
        return '요청된 시간이 만료되었습니다.';
      case 'TOO_MANY_PHONE_OTP_REQUEST':
        return '문자 인증 요청 횟수(5회)가 초과되었습니다.';
      default:
        return '';
    }
  };

  const onChangeText = (text: string) => {
    setInput(text);
    setInputMessageStatus('DEFAULT');
  };

  const onPressInputDelete = () => {
    setInput('');
    setInputMessageStatus('DEFAULT');
  };
  const handleButtonIsEnable = () => {
    if (
      isVerificationCodeSent &&
      currentInputValue.length === MAX_VERIFICATION_CODE_LENGTH
    )
      return true;
    return currentInputValue.length === MAX_PHONE_NUMBER_LENGTH;
  };

  /** 뒤로가기 클릭시 동작 */
  const handleHeaderBackButton = () => {
    if (isVerificationCodeSent) {
      setIsVerificationCodeSent(false);
      setInput('');
      setInputMessageStatus('DEFAULT');
      return;
    }
    resetAccountFlow();
  };

  // 전화번호 입력 페이지
  const handleOnPressRequestCode = useThrottle(async () => {
    if (isRetryTerm) {
      Alert.alert('제한시간(1분)이 지난 후에 다시 요청해주세요.');
      return;
    }

    const currentInputLength = currentInputValue.length;
    if (currentInputLength < MAX_PHONE_NUMBER_LENGTH) return;

    try {
      await AccountAPI.requestSMSAuthentication({
        phoneNumber: currentInputValue,
      });
      setStoredPhoneNumber(currentInputValue);
      setIsVerificationCodeSent(true);
      setInput('');
      setIsRetryTerm(true);
      setInputMessageStatus('CASE_CODE_NOT_SENT');
      startTimer();
    } catch (err) {
      const error = err as ErrorResponseType;
      if (error.message === 'TOO_MANY_PHONE_OTP_REQUEST') {
        setInputMessageStatus('TOO_MANY_PHONE_OTP_REQUEST');
        return;
      }
      customShowToast('SmsVerificationError');
      setStoredPhoneNumber(currentInputValue);
      setIsVerificationCodeSent(true);
      setInput('');
    }
  });

  // 인증번호 입력 페이지
  const handleOnPressVerifyIdentify = useThrottle(async () => {
    const currentInputLength = currentInputValue.length;
    if (currentInputLength < MAX_VERIFICATION_CODE_LENGTH) return;

    try {
      const signInRes = await AccountAPI.verifySMSAuthentication({
        phoneNumber: storedPhoneNumber,
        code: currentInputValue,
      });
      switch (signInRes.reason) {
        case 'logged_in': {
          const {accessToken, refreshToken} = signInRes;
          await UserService.onRegister({
            accessToken,
            refreshToken,
            setUserInfo,
          });
          resetAccountFlow();
          break;
        }
        case 'registering': {
          const {accessToken} = signInRes;
          storeToken({accessToken});
          changeAccountFlow('SIGN_UP');
          break;
        }
        default:
          break;
      }
    } catch (err) {
      const error = err as ErrorResponseType;
      switch (error.message) {
        case 'NO_OTP_SESSION':
          setInputMessageStatus('NOT_MATCHING_CODE');
          return;
        default:
          customShowToast('SmsVerificationError');
          captureException(error);
          return;
      }
    }
    setIsVerificationCodeSent(false); // state 초기화
    setStoredPhoneNumber(''); // state 초기화
  });

  // 인증시간
  const {currentTime, isFinish, startTimer, resetTimer} = useTimer({
    initMin: VERIFICATION_TIMER_MIN,
    initSec: VERIFICATION_TIMER_SEC,
    autoStart: false,
  });

  useEffect(() => {
    if (isFinish) setInputMessageStatus('TIME_EXPIRED');
  }, [isFinish]);

  // 재전송 제한시간
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
    setInputMessageStatus('DEFAULT');

    try {
      await AccountAPI.requestSMSAuthentication({
        phoneNumber: storedPhoneNumber,
      });
      resetTimer();
      startTimer();
      setIsRetryTerm(true);
    } catch (err) {
      customShowToast('SmsVerificationError');
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
            value={currentInputValue}
            label={isVerificationCodeSent ? '인증번호' : '전화번호'}
            statusMessage={handleInputStatusMessage(inputMessageStatus)}
            status={
              inputMessageStatus === 'DEFAULT' ||
              inputMessageStatus === 'CASE_CODE_NOT_SENT'
                ? 'default'
                : 'error'
            }
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

export default SMSVerificationScreen;
