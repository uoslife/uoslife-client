import {Linking} from 'react-native';
import notifee from '@notifee/react-native';
import {LinkingOptions} from '@react-navigation/native';
import storage from '../storage';
import {RootStackParamList} from '../navigators/RootStackNavigator';

const DEEPLINK_PREFIX_URL = ['uoslife://'];

const deepLinksConfig = {
  initialRouteName: 'Main',
  screens: {
    Main: {
      // 메인 탭
      initialRouteName: 'MainTab',
      screens: {
        MainTab: 'main',
        StudentIdTab: 'main/studentId',
        uoslifeLifeTab: 'main/uoslifeLife',
        MypageTab: {
          initialRouteName: 'Mypage_main',
          screens: {
            Mypage_main: 'mypage',
            Mypage_profile: {
              initialRouteName: 'Mypage_profile_Main',
              screens: {
                Mypage_profile_Main: 'mypage/profile',
                Mypage_changeNickname: 'mypage/profile/changeNickname',
                Mypage_portalAuthentication:
                  'mypage/profile/portalAuthentication',
              },
            },
            Mypage_appSetting: 'mypage/appSetting',
            Mypage_appInformation: {
              initialRouteName: 'Mypage_appInformation_Main',
              screens: {
                Mypage_appInformation_Main: 'mypage/appInformation',
                Mypage_ToSandPolicies: 'mypage/appInformation/ToSandPolicies',
                Mypage_privacyPolicies: 'mypage/appInformation/privacyPolicies',
                Mypage_advertisingandMarketing:
                  'mypage/appInformation/advertisingandMarketing',
              },
            },
          },
        },
        AnnouncementTab: {
          initialRouteName: 'AnnouncementMain',
          screens: {
            AnnouncementMain: 'announcement',
            AnnouncementBookmark: 'announcement/bookMark',
            AnnouncementDetail: 'announcement/detail/:id/:origin',
            AnnouncementSearch: 'announcement/search',
          },
        },
      },
    },

    Library: {
      initialRouteName: 'Library_main',
      screens: {
        Library_main: 'library',
        Library_seat_status: {
          initialRouteName: 'Library_seat_status_main',
          screens: {
            Library_seat_status_main: 'library/seatStatus',
            Library_seating_chart: 'library/seatingChart',
          },
        },
        Library_ranking: 'library/ranking',
        Library_challenge: 'library/challenge',
        Library_portal_authentication: 'library/portalAuthentication',
      },
    },
    Cafeteria: 'cafeteria',
    Meeting: 'meeting',
    LibraryRecap: 'libraryRecap',
    Roulette: 'roulette',
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: DEEPLINK_PREFIX_URL,
  // @ts-ignore
  config: deepLinksConfig,
  async getInitialURL() {
    // 딥링크를 이용해서 앱이 오픈되었을 때
    const url = await Linking.getInitialURL();

    if (url != null) return url;

    // 백그라운드에서 알림 클릭 시 deepLink가 있는 경우 해당 url을 storage에 저장
    // ref: https://github.com/react-navigation/react-navigation.github.io/issues/97
    const initialNotification = await notifee.getInitialNotification();

    if (!initialNotification) return null;

    const {data} = initialNotification.notification;

    if (!data || !data.deepLinkUrl) return null;

    storage.set('openedDeepLinkUrl', data.deepLinkUrl as string);

    return null;
  },
};

export default linking;
