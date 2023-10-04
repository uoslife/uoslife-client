import React, {useState} from 'react';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '../../navigators/MyPageStackNavigator';
import NavigationList from '../../components/navigations/navigationList/NavigationList';
import {colors, Txt} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Linking} from 'react-native';

type MyPageNavigatorItem = {
  name: string;
  navigateDestination?:
    | 'Mypage_profile'
    | 'Mypage_appSetting'
    | 'Mypage_appInformation';
  url?: string;
};

const MY_PAGE_NAVIGATION_ITEM: MyPageNavigatorItem[] = [
  {name: '계정', navigateDestination: 'Mypage_profile'},
  {
    name: '앱 설정',
    navigateDestination: 'Mypage_appSetting',
  },
  {
    name: '앱 정보',
    navigateDestination: 'Mypage_appInformation',
  },
  {
    name: '문의하기',
    url: 'https://pf.kakao.com/_gMEHK',
  },
];

const MypageMainScreen = ({
  navigation,
}: StackScreenProps<MyPageStackParamList>) => {
  const insets = useSafeAreaInsets();
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(false);

  const handleNavigate = (value: MyPageNavigatorItem) => {
    value.name === '문의하기'
      ? Linking.openURL(value.url!)
      : navigation.navigate(value.navigateDestination!);
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label={'MY Page'} />
      <S.myProfileContainer>
        <S.myProfileBox>
          <S.circleImageWrapper>
            <S.userImage source={require('../../assets/images/user.png')} />
          </S.circleImageWrapper>
          <S.textWrapper>
            <Txt
              label={'귀여운시루매(김동현)'}
              color={'grey190'}
              typograph={'titleLarge'}
            />
            <Txt
              label={
                isPortalAuthenticated
                  ? '경영학부(2023270001)'
                  : '포털 계정을 연동해주세요'
              }
              color={isPortalAuthenticated ? 'grey130' : 'primaryBrand'}
              typograph={'bodyMedium'}
            />
          </S.textWrapper>
          {MY_PAGE_NAVIGATION_ITEM.map((value, index) => {
            return (
              <NavigationList
                key={index}
                label={value.name}
                onPress={() => handleNavigate(value)}
              />
            );
          })}
        </S.myProfileBox>
        <S.logout>
          <Txt label={'로그아웃'} color={'grey130'} typograph={'bodyMedium'} />
        </S.logout>
      </S.myProfileContainer>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.ScrollView`
    flex: 1;
  `,
  myProfileContainer: styled.View`
    justify-content: space-between;
    padding: 52px 24px;
  `,
  myProfileBox: styled.View`
    align-items: center;
    gap: 14px;
  `,
  circleImageWrapper: styled.View`
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: 1px solid ${colors.grey60};
    border-radius: 80px;
  `,
  textWrapper: styled.View`
    gap: 8px;
    align-items: center;
    padding-bottom: 36px;
  `,
  userImage: styled.Image`
    width: 60px;
    height: 60px;
  `,
  logout: styled.Text`
    text-align: center;
  `,
};

export default MypageMainScreen;
