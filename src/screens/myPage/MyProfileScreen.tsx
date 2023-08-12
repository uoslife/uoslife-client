import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Header from '../../components/header/Header';
import styled, {css} from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '../../navigators/MyPageStackNavigator';

const MyProfileScreen = ({
  navigation,
}: StackScreenProps<MyPageStackParamList>) => {
  return (
    <S.screenContainer>
      <Header label={'MY Page'} />
      <S.myProfileContainer>
        <S.circlePhotoContainer>
          <S.circlePhoto>
            <S.userImage source={require('../../assets/images/user.png')} />
          </S.circlePhoto>
          <Text>한유민짱짱</Text>
          <Text>포털 계정을 이용해주세요.</Text>
          <S.contentBox>
            <Text>계정</Text>
            <Pressable onPress={() => navigation.push('myAccount')}>
              <S.arrowButtonImage
                source={require('../../assets/images/backButton.png')}
              />
            </Pressable>
          </S.contentBox>
          <S.contentBox>
            <Text>앱 설정</Text>
            <S.arrowButtonImage
              source={require('../../assets/images/backButton.png')}
            />
          </S.contentBox>
          <S.contentBox>
            <Text>앱 정보</Text>
            <S.arrowButtonImage
              source={require('../../assets/images/backButton.png')}
            />
          </S.contentBox>
          <S.contentBox>
            <Text>문의하기</Text>
            <S.arrowButtonImage
              source={require('../../assets/images/backButton.png')}
            />
          </S.contentBox>
        </S.circlePhotoContainer>
        <View>
          <Text>로그아웃</Text>
        </View>
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

  contentBox: styled.View`
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
};

const style = StyleSheet.create({
  contentBoxBorder: {
    borderBottomColor: '#A6A6A6',
    borderBottomWidth: 1,
    width: 100,
  },
});
export default MyProfileScreen;
