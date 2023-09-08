import styled from '@emotion/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useAtom} from 'jotai';
import {accountStatusAtom} from '..';
import {Button, Txt} from '@uoslife/design-system';
import Header from '../../../components/header/Header';
import Input from '../../../components/forms/input/Input';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageNestedStackParamList} from '../../../navigators/MyPageStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type SetNickNameScreenProps = StackScreenProps<
  MyPageNestedStackParamList,
  'Mypage_changeNickname'
>;

const SetNicknameScreen = ({route}: SetNickNameScreenProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const isMyPage = route?.params.isMyPage;
  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [accountStatus, setAccountStatus] = useAtom(accountStatusAtom);
  const handleButton = () => {
    setAccountStatus(prev => {
      return {
        ...prev,
        portalStatus: {isPortalStep: true, step: 0},
      };
    });
  };

  const handleStatusMessage = (status: string) => {
    switch (status) {
      case 'codeError':
        return '사용할 수 없는 닉네임입니다.';
      case 'successNickname':
        return '사용 가능한 닉네임입니다.';
      case 'duplicateedNickname':
        return '중복되는 닉네임입니다.';
      default:
        return '';
    }
  };

  return (
    <>
      <S.screenContainer style={{paddingTop: insets.top}}>
        <Header
          label={isMyPage ? '닉네임 변경' : '닉네임 설정'}
          onPressBackButton={() => {
            if (isMyPage) return navigation.goBack();
            switch (accountStatus.stepStatus.userType) {
              case 'EXISTED':
                setAccountStatus(prev => {
                  return {
                    ...prev,
                    stepStatus: {
                      userType: 'EXISTED',
                      step: 0,
                    },
                  };
                });
                break;
              case 'NEW':
                setAccountStatus(prev => {
                  return {
                    ...prev,
                    stepStatus: {
                      userType: 'NONE',
                      step: 0,
                    },
                  };
                });
            }
          }}
        />
        <S.setNicknameContainer>
          <View style={{gap: 32}}>
            <View style={{gap: 8}}>
              <Txt
                label={
                  isMyPage
                    ? '변경하실 닉네임을 입력해주세요.'
                    : '사용하실 닉네임을 입력해주세요.'
                }
                color={'grey190'}
                typograph={'headlineMedium'}
              />
              <Txt
                label={
                  '닉네임은 최대 8자로 설정 가능합니다.\n한글, 영문, 숫자, 특수기호를 이용해주세요.'
                }
                color={'grey190'}
                typograph={'bodyMedium'}
              />
            </View>
            <Input
              onChangeText={text => setInputValue(text)}
              maxLength={8}
              onPress={() => setInputValue('')}
              value={inputValue}
              label={'닉네임'}
              statusMessage={handleStatusMessage(statusMessage)}
              status={'default'}
              placeholder={'여기에 입력하세요.'}
            />
          </View>
          <Button
            label={'설정하기'}
            onPress={handleButton}
            isEnabled={!!inputValue}
            isFullWidth={true}
          />
        </S.setNicknameContainer>
      </S.screenContainer>
    </>
  );
};

export default SetNicknameScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  setNicknameContainer: styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 28px 16px;
  `,
};
