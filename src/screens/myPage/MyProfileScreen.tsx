import React from 'react';
import {Text} from 'react-native';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '../../navigators/MyPageStackNavigator';
import NavigationList from '../../components/navigations/navigationList/NavigationList';

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
        <S.myProfileBox>
          <S.circleImageWrapper>
            <S.userImage source={require('../../assets/images/user.png')} />
          </S.circleImageWrapper>
          <Text>한유민짱짱</Text>
          <Text style={{paddingBottom: 64}}>포털 계정을 이용해주세요.</Text>
          {myPageNavigatorItems.map((value, index) => {
            return (
              <NavigationList
                key={index}
                label={value.name}
                hasBorder={value.hasBorder}
                onPress={() => navigation.push(value.navigateDestination)}
              />
            );
          })}
        </S.myProfileBox>
        <S.logout>로그아웃</S.logout>
      </S.myProfileContainer>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.ScrollView`
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
  myProfileBox: styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
  `,
  circleImageWrapper: styled.View`
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
  logout: styled.Text`
    text-align: center;
    color: #7b7b7b;
    text-decoration-line: underline;
  `,
};

export default MyProfileScreen;
