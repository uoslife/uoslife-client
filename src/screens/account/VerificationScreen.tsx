import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import Input from '../../components/forms/input/Input';
import {Button} from '../../components/button/Button';

const VerificationScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [warningStatus, setWarningStatus] = useState('codeError');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const handleWarningMessage = (status: string) => {
    switch (status) {
      case 'codeError':
        return '입력하신 인증번호가 일치하지 않습니다.';
      case 'requestExceed':
        return '1일 인증 요청 가능 횟수를 초과하였습니다.';
      case 'timeExpired':
        return '요청된 시간이 만료되었습니다.';
    }
  };

  const onChangeText = (text: string) => {
    setInputValue(
      text
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, ''),
    );
  };

  const handleRequestVerifyCode = () => {
    if (inputValue.length < 13) return;
    setIsVerificationCodeSent(true);
    setInputValue('');
  };
  const handleVerifyIdentify = () => {};

  return (
    <S.screenContainer>
      <Header label="전화번호 본인인증" />
      <S.verificationContainer>
        <View>
          <Text>전화번호를 입력해주세요</Text>
          <Text>* 인증번호 전송은 1일 5회로 제한됩니다.</Text>
          <Input
            onChangeText={text => onChangeText(text)}
            onPress={() => setInputValue('')}
            keyboardType={'numeric'}
            value={inputValue}
            label={'안녕'}
            statusMessage={handleWarningMessage(warningStatus)}
            status={warningStatus ? 'error' : 'default'}
            placeholder={
              isVerificationCodeSent ? '인증번호 입력' : '핸드폰 번호 입력'
            }
          />
        </View>
        <View>
          <Button
            type={inputValue.length > 12 ? 'primary' : 'default'}
            label={isVerificationCodeSent ? '인증번호 받기' : '본인인증 하기'}
            onPress={
              isVerificationCodeSent
                ? handleVerifyIdentify
                : handleRequestVerifyCode
            }
          />
        </View>
      </S.verificationContainer>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    height: 100%;
    width: 100%;
  `,

  verificationContainer: styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 42px 28px;
  `,

  retryCodeRequestContainer: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};

export default VerificationScreen;
