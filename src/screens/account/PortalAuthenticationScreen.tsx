import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../components/header/Header';
import RoundTextInput from '../../components/forms/roundTextInput/RoundTextInput';
import {Button} from '../../components/button/Button';

const PortalAuthenticationScreen = ({navigation}) => {
  const [success, setSuccess] = useState(true);
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // api fetching 하여 portal i

  const submitHandler = () => {
    if (api.id === inputId && api.password === inputPassword) {
      navigation.navigate('portalAuthenticationSuccessScreen');
    } else {
      setSuccess(false);
    }
  };

  const restrictSubmitHandler = () => {
    alert('포털 아이디와 비밀번호를 입력해주세요');
  };

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
        onChangeText={text => {
          setInputId(text);
          setSuccess(true);
        }}
        status={success ? 'default' : 'error'}
        // keyboardType=""
      />
      <Text>포털 비밀번호</Text>
      <RoundTextInput
        placeholder="비밀번호 입력"
        onChangeText={text => {
          setInputPassword(text);
          setSuccess(true);
        }}
        status={success ? 'default' : 'error'}
        // keyboardType=""
        secureTextEntry={true}
      />
      {success ? null : <Text>아이디 또는 비밀번호를 확인해주세요</Text>}
      <Text>포털 연동 다음에 하기</Text>
      {inputId === '' && inputPassword === '' ? (
        <Button label="확인" onPress={restrictSubmitHandler} />
      ) : (
        <Button label="확인" onPress={submitHandler} type="primary" />
      )}
    </View>
  );
};

export default PortalAuthenticationScreen;
