import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Linking, Platform} from 'react-native';
import NavigationList from '../../../../components/molecules/common/navigationList/NavigationList';
import Header from '../../../../components/molecules/common/header/Header';
import urls from '../../../../configs/urls';
import useUserState from '../../../../hooks/useUserState';
import customShowToast from '../../../../configs/toast';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';

const UosLifestyleScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const {user} = useUserState();
  const onPressMeeting = async () => {
    if (!user?.isVerified) {
      customShowToast('notVerifiedUserAccessMeeting');
      navigation.navigate('student_id_portal_authentication');
      return;
    }
    if (Platform.OS === 'android') await Linking.openURL(urls.MEETING_URL);
    else navigation.navigate('meeting');
  };
  return (
    <S.Container bounces={false} style={{paddingTop: insets.top}}>
      <Header isDisableBackButton label="시대생활" />
      <S.NavigationListContainer>
        <NavigationList
          label="시대팅"
          labelIcon="heart"
          onPress={onPressMeeting}
        />
        <NavigationList
          label="숨은 학점 확인하기"
          labelIcon="search"
          onPress={() => navigation.navigate('hidden_grade')}
        />
        <NavigationList
          label="2023 도서관 이용내역"
          labelIcon="library"
          onPress={() => navigation.navigate('library_recap')}
        />
      </S.NavigationListContainer>
    </S.Container>
  );
};

export default UosLifestyleScreen;

const S = {
  Container: styled.ScrollView``,
  NavigationListContainer: styled.View`
    margin-top: 18px;
    padding: 0 12px;
    gap: 6px;
  `,
};
