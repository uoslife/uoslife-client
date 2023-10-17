import React, {useState} from 'react';
import {Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {colors, Txt} from '@uoslife/design-system';
import URLS from '../../configs/urls';
import Header from '../../components/header/Header';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '../../navigators/MyPageStackNavigator';
import NavigationList from '../../components/navigations/navigationList/NavigationList';

type MyPageNavigatorItem = {
  name: string;
  handleOnPress: () => void;
};

const createMyPageNavigations = (navigation: any): MyPageNavigatorItem[] => [
  {
    name: '계정',
    handleOnPress: () => navigation.navigate('Mypage_profile'),
  },
  {
    name: '앱 설정',
    handleOnPress: () => navigation.navigate('Mypage_appSetting'),
  },
  {
    name: '앱 정보',
    handleOnPress: () => navigation.navigate('Mypage_appInformation'),
  },
  {
    name: '문의하기',
    handleOnPress: () => Linking.openURL(URLS.KAKAOTALK_UOSLIFE),
  },
];

const MypageMainScreen = ({
  navigation,
}: StackScreenProps<MyPageStackParamList>) => {
  const insets = useSafeAreaInsets();
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(false);
  const MY_PAGE_NAVIGATIONS = createMyPageNavigations(navigation);

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
          {MY_PAGE_NAVIGATIONS.map((navigation, index) => (
            <NavigationList
              key={index}
              label={navigation.name}
              onPress={navigation.handleOnPress}
            />
          ))}
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
