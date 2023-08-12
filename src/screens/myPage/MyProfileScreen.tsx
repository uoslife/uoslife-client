import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Header from '../../components/header/Header';
import styled, {css} from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '../../navigators/MyPageStackNavigator';

type MyPageNavigatorItem = {
  name: string;
  navigateDestination: keyof MyPageStackParamList;
  hasBorder: boolean;
};

const MyProfileScreen = ({
  navigation,
}: StackScreenProps<MyPageStackParamList>) => {
  const myPageNavigatorItems: MyPageNavigatorItem[] = [
    {name: '계정', navigateDestination: 'myAccount', hasBorder: true},
    {name: '앱 설정', navigateDestination: 'myAppSetting', hasBorder: true},
    {
      name: '앱 정보',
      navigateDestination: 'myAppInformation',
      hasBorder: true,
    },
    {name: '문의하기', navigateDestination: 'myProfile', hasBorder: false},
  ];

  return (
    <S.screenContainer>
      <Header label={'MY Page'} />
      <S.myProfileContainer>
        <S.circlePhotoContainer>
          <S.circlePhoto>
            <S.userImage source={require('../../assets/images/user.png')} />
          </S.circlePhoto>
          <Text>한유민짱짱</Text>
          <Text style={{paddingBottom: 64}}>포털 계정을 이용해주세요.</Text>
          {myPageNavigatorItems.map((value, index) => {
            return (
              <S.navigateContainer>
                <S.navigateContent key={index}>
                  <Text>{value.name}</Text>
                  <Pressable
                    onPress={() => navigation.push(value.navigateDestination)}>
                    <S.arrowButtonImage
                      source={require('../../assets/images/backButton.png')}
                    />
                  </Pressable>
                </S.navigateContent>
                <View
                  style={
                    value.hasBorder ? style.bottomBorder : style.marginBottom
                  }></View>
              </S.navigateContainer>
            );
          })}
        </S.myProfileBox>
        <S.logout>로그아웃</S.logout>
      </S.myProfileContainer>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    height: 100%;
    width: 100%;
  `,

  myProfileContainer: styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 54px 39px 54px;
  `,

  circlePhotoContainer: styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
  `,

  circlePhoto: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: 1px solid #a6a6a6;
    border-radius: 80px;
  `,

  userImage: styled.Image`
    width: 60px;
    height: 60px;
  `,
  navigateContent: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,

  arrowButtonImage: styled.Image`
    width: 14px;
    height: 9px;
    transform: rotate(180deg);
  `,
  navigateContainer: styled.View`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 24px;
    padding-bottom: 10px;
  `,
  logout: styled.Text`
    text-align: center;
    color: #7b7b7b;
    text-decoration-line: underline;
  `,
};

const style = StyleSheet.create({
  bottomBorder: {
    borderBottomColor: '#A6A6A6',
    borderBottomWidth: 1,
  },
  marginBottom: {
    paddingBottom: 176,
  },
});
export default MyProfileScreen;
