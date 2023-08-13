import styled, {css} from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {AccountStackParamList} from '../../navigators/AccountStackNavigator';

const SignupScreen = ({
  navigation,
}: StackScreenProps<AccountStackParamList>) => {
  return (
    <View>
      <Text>SignupScreen</Text>
      <S.bannerWrapper>
        <S.bannerImg />
      </S.bannerWrapper>
      <S.button title="로그인" />
      <View
        style={css`
          display: flex;
        `}>
        <Button
          title="go VerificationScreen"
          onPress={() => navigation.push('verification')}
        />
        <Button
          title="go SetNicknameScreen"
          onPress={() => navigation.push('setNickname')}
        />
        <Button
          title="go AgreementTermsScreen"
          onPress={() => navigation.push('agreementTerms')}
        />
        <Button
          title="go PortalAuthenticationScreen"
          onPress={() => navigation.push('portalAuthentication')}
        />
        <Button
          title="go MyPageScreen"
          onPress={() => navigation.push('myPage')}
        />
      </View>
    </View>
  );
};

export default SignupScreen;

const S = {
  screenContainer: styled.ScrollView`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  bannerWrapper: styled.View`
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  bannerImg: styled.View`
    width: 100%;
    height: 300px;
    background: grey;
  `,
  button: styled.Button`
    width: 100%;
  `,
};
