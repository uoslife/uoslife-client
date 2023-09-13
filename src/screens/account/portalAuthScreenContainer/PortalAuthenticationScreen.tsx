import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import Input from '../../../components/forms/input/Input';
import styled from '@emotion/native';
import {Txt, Button, colors} from '@uoslife/design-system';
import {Pressable, View} from 'react-native';
import {useSetAtom} from 'jotai';
import {accountStatusAtom} from '..';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const PortalAuthenticationScreen = () => {
  const insets = useSafeAreaInsets();
  const setAccountStatus = useSetAtom(accountStatusAtom);

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
    setAccountStatus(prev => {
      return {
        ...prev,
        portalStatus: {
          isPortalStep: prev.portalStatus.isPortalStep,
          step: 1,
        },
      };
    });
  };

  const handleSubmit = () => {
    // 확인 버튼 입력 시, 관련 기능 추가
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header
        label="포털 계정 연동"
        onPressBackButton={() =>
          setAccountStatus(prev => {
            return {
              ...prev,
              portalStatus: {
                isPortalStep: false,
                step: 0,
              },
            };
          })
        }
      />
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
                '포털 계정 연동을 통해 다양한 편의 기능(ex. 시대팅)을 이용할 수 있습니다.\n계정 정보는 서버에 안전한 암호화 방식으로 저장됩니다.'
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
        <S.bottomContainer>
          <S.postponePortalAuthButton>
            <Pressable onPress={handlePostponePortalAuth}>
              <Txt
                label={'포털 연동 다음에 하기'}
                color={'grey130'}
                typograph={'bodySmall'}
              />
            </Pressable>
          </S.postponePortalAuthButton>
          <Button
            label={'확인'}
            onPress={handleSubmit}
            isEnabled={!!(inputValue.id && inputValue.password)}
            isFullWidth={true}
          />
        </S.bottomContainer>
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
    padding: 28px 16px;
  `,
  bottomContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  postponePortalAuthButton: styled.View`
    padding-bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
  `,
};
