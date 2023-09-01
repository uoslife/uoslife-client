import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import Input from '../../../components/forms/input/Input';
import {Button, Txt, Timer} from '@uoslife/design-system';
import {useSetAtom} from 'jotai';
import {
  UserType,
  accountFlowStatusAtom,
  accountStatusAtom,
  existedAccountInfoAtom,
  existedAccountInfoType,
} from '../../../atoms/account';
import {CoreAPI} from '../../../api/services';
import showErrorMessage from '../../../utils/showErrorMessage';
import setTokenWhenLogin from '../../../utils/setTokenWhenLogin';

const MAX_SMS_TRIAL_COUNT = 5;
const MAX_PHONE_NUMBER_LENGTH = 11;
const MAX_VERIFICATION_CODE_LENGTH = 6;

type InputStatusMessageType =
  | 'DEFAULT'
  | 'NOT_MATCHING_CODE'
  | 'REQUEST_EXCEED'
  | 'TIME_EXPIRED';

const VerificationScreen = () => {
  const setAccountFlowStatus = useSetAtom(accountFlowStatusAtom);
  const setAccountStatus = useSetAtom(accountStatusAtom);
  const setExistedAccountInfo = useSetAtom(existedAccountInfoAtom);
  const [inputValue, setInputValue] = useState('');
  const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
  const [inputMessageStatus, setInputMessageStatus] =
    useState<InputStatusMessageType>('DEFAULT');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  // 공통
  const handleInputStatusMessage = (status: InputStatusMessageType) => {
    switch (status) {
      case 'DEFAULT':
        return '인증번호가 오지 않나요?';
      case 'NOT_MATCHING_CODE':
        return '입력하신 인증번호가 일치하지 않습니다.';
      case 'REQUEST_EXCEED':
        return '1일 인증 요청 가능 횟수를 초과하였습니다.';
      case 'TIME_EXPIRED':
        return '요청된 시간이 만료되었습니다.';
    }
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
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
    setAccountFlowStatus(prev => {
      return {
        ...prev,
        baseStatus: 'DEFAULT',
      };
    });
  };

  const checkUserTypeBeforeRedirect = async (): Promise<UserType> => {
    const loginRes = await CoreAPI.login({phone: storedPhoneNumber});
    if (loginRes.statusCode === 201) {
      setTokenWhenLogin(loginRes.accessToken, loginRes.refreshToken);
      return 'NONE';
    }

    const res = await CoreAPI.getExistedAccountInfo({
      mobile: storedPhoneNumber,
    });
    if (!!res) {
      // TODO: refactoring 필요
      const existedAccountInfo = res.map(data => {
        return {id: data.id, nickname: data.nickname, isSelected: false};
      }) as existedAccountInfoType;
      setExistedAccountInfo(() => {
        return existedAccountInfo;
      });
      return 'EXISTED';
    }
    return 'NEW';
  };

  // 전화번호 입력 페이지
  const handleOnPressRequestCode = async () => {
    if (inputValue.length < MAX_PHONE_NUMBER_LENGTH) return;
    try {
      const smsVerificationRes = await CoreAPI.sendSmsVerification({
        mobile: inputValue,
      });
      setStoredPhoneNumber(inputValue);
      setIsVerificationCodeSent(true);
      setInputValue('');
    } catch (error) {
      showErrorMessage(error);
      setStoredPhoneNumber(inputValue);
      setIsVerificationCodeSent(true);
      setInputValue('');
    }
  };

  // 인증번호 입력 페이지
  const handleOnPressVerifyIdentify = async () => {
    try {
      const smsVerificationRes = await CoreAPI.checkSmsVerification({
        mobile: storedPhoneNumber,
        code: inputValue,
      });
      if (!smsVerificationRes.isVerified)
        setInputMessageStatus('NOT_MATCHING_CODE');

      const userType = await checkUserTypeBeforeRedirect();
      setIsVerificationCodeSent(false); // state 초기화
      setStoredPhoneNumber(''); // state 초기화
      if (userType === 'NONE') {
        setAccountStatus(prev => {
          return {...prev, isLogin: true};
        });
        return;
      }
      setAccountFlowStatus(prev => {
        return {
          ...prev,
          stepStatus: {
            userType: userType,
            step: 0,
          },
        };
      });
    } catch (error) {
      showErrorMessage(error);
      // TODO: 아래 코드는 api 연결 완료시 삭제
      setIsVerificationCodeSent(false);
      setStoredPhoneNumber('');
      setAccountFlowStatus(prev => {
        return {
          ...prev,
          stepStatus: {
            userType: 'EXISTED',
            step: 0,
          },
        };
      });
    }
  };

  const handleOnPressRetryButton = async () => {
    const smsVerificationRes = await CoreAPI.sendSmsVerification({
      mobile: storedPhoneNumber,
    });
    if (smsVerificationRes.trialCount >= MAX_SMS_TRIAL_COUNT) return; // TODO: 만료시 동작 구현 필요
  };

  return (
    <S.screenContainer>
      <Header
        label={'전화번호 본인인증'}
        onPressBackButton={handleHeaderBackButton}
      />
      <S.verificationContainer>
        <View style={{gap: 32}}>
          <View style={{gap: 8}}>
            <Txt
              typograph={'headlineMedium'}
              color={'grey190'}
              label={
                isVerificationCodeSent
                  ? '인증번호를 입력해주세요.'
                  : '전화번호를 입력해주세요.'
              }
            />
            <Txt
              typograph={'bodyMedium'}
              color={'grey190'}
              label={'인증번호 전송은 1일 5회로 제한됩니다.'}
            />
          </View>
          <Input
            onChangeText={onChangeText}
            maxLength={
              isVerificationCodeSent
                ? MAX_VERIFICATION_CODE_LENGTH
                : MAX_PHONE_NUMBER_LENGTH
            }
            onPress={() => setInputValue('')}
            keyboardType={'numeric'}
            value={inputValue}
            label={isVerificationCodeSent ? '인증번호' : '전화번호'}
            statusMessage={
              isVerificationCodeSent
                ? handleInputStatusMessage(inputMessageStatus)
                : undefined
            }
            status={inputMessageStatus === 'DEFAULT' ? 'default' : 'error'}
            placeholder={isVerificationCodeSent ? '000000' : '01012345678'}>
            {isVerificationCodeSent && (
              <>
                <Timer
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: inputValue ? 50 : 7,
                  }}
                />
                <S.requestRetryButton
                  style={{zIndex: 6}}
                  onPress={handleOnPressRetryButton}>
                  <Txt
                    label={'재전송'}
                    color={'grey190'}
                    typograph={'labelMedium'}
                  />
                </S.requestRetryButton>
              </>
            )}
          </Input>
        </View>
        <Button
          label={isVerificationCodeSent ? '본인인증 하기' : '인증번호 받기'}
          onPress={
            isVerificationCodeSent
              ? handleOnPressVerifyIdentify
              : handleOnPressRequestCode
          }
          isEnabled={handleButtonIsEnable()}
          isFullWidth={true}
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
    padding: 42px 28px;
  `,

  requestRetryButton: styled.Pressable`
    position: absolute;
    top: 45px;
    right: 7px;
    padding-bottom: 1px;
  `,
};

export default VerificationScreen;
