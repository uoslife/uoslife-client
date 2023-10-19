import React, {useState} from 'react';
import {Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import URLS from '../../configs/urls';
import Header from '../../components/header/Header';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '../../navigators/MyPageStackNavigator';
import NavigationList from '../../components/navigations/navigationList/NavigationList';
import {Button, colors, Txt} from '@uoslife/design-system';
import {UserService} from '../../services/user';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigators/RootStackNavigator';

const MypageMainScreen = ({
  navigation,
}: StackScreenProps<MyPageStackParamList>) => {
  const insets = useSafeAreaInsets();
  const rootNavigation = useNavigation<RootNavigationProps>();
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(false);

  const handlePressLogoutButton = async () => {
    await UserService.logout();
    rootNavigation.navigate('Account');
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}} bounces={false}>
      <Header
        label={'마이페이지'}
        onPressBackButton={() => navigation.goBack()}
      />
      <S.myProfileContainer>
        <S.myProfileBox>
          <S.circleImageWrapper>
            {/*<S.userImage source={require('../../assets/images/user.png')} />*/}
            <S.userImage
              source={require('../../assets/images/iroomae_character.png')}
            />
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
          <S.NavigationListWapper>
            <NavigationList
              label="계정"
              onPress={() => navigation.navigate('Mypage_profile')}
            />
            <NavigationList
              label="앱 설정"
              onPress={() => navigation.navigate('Mypage_appSetting')}
            />
            <NavigationList
              label="앱 정보"
              onPress={() => navigation.navigate('Mypage_appInformation')}
            />
            <NavigationList
              label="문의하기"
              onPress={() => Linking.openURL(URLS.KAKAOTALK_UOSLIFE)}
            />
          </S.NavigationListWapper>
        </S.myProfileBox>
        <Button
          label={'로그아웃'}
          variant="text"
          onPress={handlePressLogoutButton}
        />
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
    width: 75px;
    height: 100px;
  `,
  logout: styled.Pressable`
    text-align: center;
  `,
  NavigationListWapper: styled.View`
    width: 100%;
  `,
};

export default MypageMainScreen;
