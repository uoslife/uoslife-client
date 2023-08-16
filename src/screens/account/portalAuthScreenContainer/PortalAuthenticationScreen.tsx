import React, {useState} from 'react';
import {View, Text} from 'react-native';

import Header from '../../../components/header/Header';
import RoundTextInput from '../../../components/forms/roundTextInput/RoundTextInput';
import {Button} from '../../../components/button/Button';
import {TextInput} from 'react-native-gesture-handler';

const PortalAuthenticationScreen = () => {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({id: '', password: ''});

  const onChangeText = (text: string, target: string) => {
    setSubmit(false);
    setInput({...input, [target]: text});
  };

  const submitHandler = () => {
    setSubmit(true);
    if (input.id === 'API.id' && input.password === 'API.password') {
      setError(false);
      // navigate to PortalAuthenticationSuccessScreen
    } else {
      setError(true);
    }
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
        onChangeText={text => onChangeText(text, 'id')}
        status={submit && error ? 'error' : 'default'}
      />
      <Text>포털 비밀번호</Text>
      <TextInput placeholder="비밀번호" />
      <RoundTextInput
        placeholder="비밀번호 입력"
        onChangeText={text => onChangeText(text, 'password')}
        status={submit && error ? 'error' : 'default'}
        secureTextEntry={true}
      />
      {submit && error ? (
        <Text>아이디 또는 비밀번호를 확인해주세요</Text>
      ) : null}
      <Text>포털 연동 다음에 하기</Text>
      {input.id === '' || input.password === '' ? (
        <Button label="확인" disabled={true} />
      ) : (
        <Button label="확인" onPress={submitHandler} type="primary" />
      )}
    </View>
  );
};

export default PortalAuthenticationScreen;
