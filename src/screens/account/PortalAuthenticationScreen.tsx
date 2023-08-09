import React from 'react';
import {View, Text, Button} from 'react-native';
import Header from '../../components/header/Header';
import RoundTextInput from '../../components/forms/roundTextInput/RoundTextInput';

const PortalAuthenticationScreen = () => {
  return (
    <View>
      <Header label="포털 계정 연동" />
      <Text>서울시립대학교 포털 계정 연동하기</Text>
      <Text>
        ᆞ포털 계정 연동을 통해 다양한 편의 기능 {'\n'} (ex. 시대팅)을 이용할 수
        있어요.
      </Text>
      <Text>ᆞ계정 정보는 서버에 안전한 암호화 방식으로 저장돼요.</Text>
      <Text>포털 아이디</Text>
      <RoundTextInput
        placeholder="아이디 입력"
        keyboardType="ascii-capable-number-pad"
      />
      <Text>포털 비밀번호</Text>
      <RoundTextInput placeholder="비밀번호 입력" />
      <Text>포털 연동 다음에 하기</Text>
      <Button title={'확인'} />
    </View>
  );
};

export default PortalAuthenticationScreen;
