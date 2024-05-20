import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Linking, Platform} from 'react-native';
import NavigationList from '../../components/molecules/common/navigationList/NavigationList';
import Header from '../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../navigators/RootStackNavigator';
import urls from '../../configs/urls';

const LIBRARY_RECAP_DEEPLINK = 'uoslife://libraryRecap';
const UoslifeLifeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();

  return (
    <S.Container bounces={false} style={{paddingTop: insets.top}}>
      <Header isDisableBackButton label="시대생활" />
      <S.NavigationListContainer>
        <NavigationList
          label="시대팅"
          labelIcon="heart"
          onPress={async () =>
            Platform.OS === 'android'
              ? await Linking.openURL(urls.MEETING_URL)
              : navigation.navigate('UoslifeMeeting')
          }
        />
        <NavigationList
          label="숨은 학점 확인하기"
          labelIcon="search"
          onPress={() => navigation.navigate('CheckGrade')}
        />
        <NavigationList
          label="2023 도서관 이용내역"
          labelIcon="library"
          onPress={async () => await Linking.openURL(LIBRARY_RECAP_DEEPLINK)}
        />
      </S.NavigationListContainer>
    </S.Container>
  );
};

export default UoslifeLifeScreen;

const S = {
  Container: styled.ScrollView``,
  NavigationListContainer: styled.View`
    margin-top: 18px;
    padding: 0 12px;
    gap: 6px;
  `,
};
