import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import Input from '../../../components/forms/input/Input';
import {Button, Txt, Timer, colors} from '@uoslife/design-system';
import {useSetAtom} from 'jotai';
import {accountStatusAtom} from '..';

const VerificationScreen = () => {
  const setAccountStatus = useSetAtom(accountStatusAtom);
  const [inputValue, setInputValue] = useState('');
  const [warningStatus, setWarningStatus] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const handleWarningMessage = (status: string) => {
    switch (status) {
      case 'codeError':
        return '입력하신 인증번호가 일치하지 않습니다.';
      case 'requestExceed':
        return '1일 인증 요청 가능 횟수를 초과하였습니다.';
      case 'timeExpired':
        return '요청된 시간이 만료되었습니다.';
      default:
        return '인증번호가 오지 않나요?';
    }
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
  };

  const handleRequestVerifyCode = () => {
    if (inputValue.length < 11) return;
    setIsVerificationCodeSent(true);
    setInputValue('');
  };

  const handleVerifyIdentify = async () => {
    setAccountStatus(prev => {
      return {
        ...prev,
        stepStatus: {
          userType: 'EXISTED',
          step: 0,
        },
      };
    });
  };

  const handleButtonIsEnable = () => {
    if (isVerificationCodeSent && inputValue.length === 6) return true;
    return inputValue.length === 11;
  };

  return (
    <S.screenContainer>
      <Header label={'전화번호 본인인증'} />
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
            onChangeText={text => onChangeText(text)}
            maxLength={isVerificationCodeSent ? 6 : 11}
            onPress={() => setInputValue('')}
            keyboardType={'numeric'}
            value={inputValue}
            label={isVerificationCodeSent ? '인증번호' : '전화번호'}
            statusMessage={handleWarningMessage(warningStatus)}
            status={warningStatus ? 'error' : 'default'}
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
                  style={{
                    borderBottomColor: colors.grey190,
                    borderBottomWidth: 1,
                  }}>
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
          label={isVerificationCodeSent ? '인증번호 받기' : '본인인증 하기'}
          onPress={
            isVerificationCodeSent
              ? handleVerifyIdentify
              : handleRequestVerifyCode
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

  requestRetryButton: styled.View`
    position: absolute;
    top: 45px;
    right: 7px;
    padding-bottom: 1px;
  `,
};

export default VerificationScreen;
