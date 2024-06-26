import {Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Button, colors, Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import URLS from '../../../../configs/urls';
import Header from '../../../../components/molecules/common/header/Header';
import NavigationList from '../../../../components/molecules/common/navigationList/NavigationList';
import UserService from '../../../../services/user';
import useUserState from '../../../../hooks/useUserState';
import {MypageNavigationProp} from '../../navigators/types/mypage';

const MypageMainScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MypageNavigationProp>();
  const {user, deleteUserInfo} = useUserState();

  const {nickname, isVerified} = user || {};

  const handlePressLogoutButton = async () => {
    await UserService.logout({deleteUserInfo, user: user!});
  };

  const portalInfoMessage = isVerified
    ? `${user?.identity.department}(${user?.identity.idNumber})`
    : '포털 계정을 연동해주세요';

  return (
    <S.screenContainer style={{paddingTop: insets.top}} bounces={false}>
      <Header
        label="마이페이지"
        onPressBackButton={() => navigation.goBack()}
        isDisableBackButton
      />
      <S.myProfileContainer>
        <S.myProfileBox>
          <S.circleImageWrapper>
            {/* <S.userImage source={require('../../assets/images/user.png')} /> */}
            <S.userImage
              source={require('../../../../assets/images/iroomae_character.png')}
            />
          </S.circleImageWrapper>
          <S.textWrapper>
            <Txt
              label={nickname ?? ''}
              color="grey190"
              typograph="titleLarge"
            />
            <Txt
              label={portalInfoMessage}
              color={isVerified ? 'grey130' : 'primaryBrand'}
              typograph="bodyMedium"
            />
          </S.textWrapper>
          <S.NavigationListWapper>
            <NavigationList
              label="계정"
              onPress={() => navigation.navigate('mypage_account')}
            />
            <NavigationList
              label="알림 설정"
              onPress={() => navigation.navigate('mypage_app_setting')}
            />
            <NavigationList
              label="앱 정보"
              onPress={() => navigation.navigate('mypage_app_information')}
            />
            <NavigationList
              label="문의하기"
              onPress={() => Linking.openURL(URLS.KAKAOTALK_UOSLIFE)}
            />
          </S.NavigationListWapper>
        </S.myProfileBox>
        <Button
          label="로그아웃"
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
