import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import Input from '../../../components/forms/input/Input';
import styled from '@emotion/native';
import {Txt, Button, colors} from '@uoslife/design-system';
import {Pressable, View} from 'react-native';

const PortalAuthenticationScreen = () => {
  const [status, setStatus] = useState('');
  const [inputValue, setInputValue] = useState({id: '', password: ''});

  const handleStatusMessage = (status: string) => {
    switch (status) {
      case 'codeError':
        return '입력하신 인증번호가 일치하지 않습니다.';
      case 'requestExceed':
        return '1일 인증 요청 가능 횟수를 초과하였습니다.';
      case 'timeExpired':
        return '요청된 시간이 만료되었습니다.';
    }
  };

  const onChangeText = (text: string, target: string) => {
    setInputValue({...inputValue, [target]: text});
  };

  const handlePostponePortalAuth = () => {
    // 포탈 인증 다음에 하기 관련 기능 추가
  };

  const handleSubmit = () => {
    // 확인 버튼 입력 시, 관련 기능 추가
  };

  return (
    <S.screenContainer>
      <Header label="포털 계정 연동" />
      <S.portalAuthenticationContainer>
        <View style={{gap: 32}}>
          <View style={{gap: 8}}>
            <Txt
              typograph={'headlineMedium'}
              color={'grey190'}
              label={'서울시립대학교\n포털 계정 연동하기'}
            />
            <Txt
              typograph={'bodyMedium'}
              color={'grey190'}
              label={
                '포털 계정 연동을 통해 다양한 편의 기능(ex. 시대팅)을 이용할 수 있어요.\n계정 정보는 서버에 안전한 암호화 방식으로 저장돼요.'
              }
            />
          </View>
          <Input
            onChangeText={text => onChangeText(text, 'id')}
            onPress={() => onChangeText('', 'id')}
            value={inputValue.id}
            label={'포털 아이디'}
            status={'default'}
            statusMessage={handleStatusMessage(status)}
            placeholder={'아이디'}
          />
          <Input
            onChangeText={text => onChangeText(text, 'password')}
            onPress={() => onChangeText('', 'password')}
            value={inputValue.password}
            secureTextEntry={true}
            label={'포털 비밀번호'}
            status={'default'}
            statusMessage={handleStatusMessage(status)}
            placeholder={'비밀번호'}
          />
        </View>
        <View>
          <Button
            label={'확인'}
            onPress={handleSubmit}
            isEnabled={!!(inputValue.id && inputValue.password)}
            isFullWidth={true}
          />
        </View>
        <S.postponePortalAuthButton
          style={{
            borderBottomColor: colors.grey190,
            borderBottomWidth: 1,
          }}>
          <Pressable onPress={handlePostponePortalAuth}>
            <Txt
              label={'포털 연동 다음에 하기'}
              color={'grey190'}
              typograph={'labelMedium'}
            />
          </Pressable>
        </S.postponePortalAuthButton>
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
    padding: 42px 28px;
  `,
  postponePortalAuthButton: styled.View`
    position: absolute;
    top: 93%;
    left: 42%;
    padding-bottom: 1px;
  `,
};
