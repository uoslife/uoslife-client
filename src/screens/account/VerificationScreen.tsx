import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Header from '../../components/header/Header';
import styled, {css} from '@emotion/native';

const VerificationScreen = () => {
  const [value, setValue] = useState({
    name: '',
  });
  const onChangeText = (text: string, target: string) => {
    setValue({
      ...value,
      [target]: text,
    });
  };

  const handleWarningMessage = () => {
    //   switch 문으로 각 상태에 따른 메시지를 return 해주기.
  };

  return (
    <S.screenContainer>
      <Header label="전화번호 본인인증" />
      <S.verificationContainer>
        <View>
          <Text>전 화번호를 입력해주세요</Text>
          <Text>* 인증번호 전송은 1일 5회로 제한됩니다.</Text>
          <Text>휴대폰 번호 입력 컴포넌트 영역</Text>
          <Text>경고 메시지 영역</Text>
          <Text>인증번호 재전송 영역</Text>
        </View>
        <View>
          <Text>인증번호 받기 컴포넌트 영역</Text>
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
    padding: 27px 12px;
  `,
};

export default VerificationScreen;
