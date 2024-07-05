import {Linking} from 'react-native';
import notifee from '@notifee/react-native';
import {LinkingOptions} from '@react-navigation/native';
import storage from '../../storage';
import {RootStackParamList} from '../../navigators/types/rootStack';

const DEEPLINK_PREFIX_URL = ['uoslife://'];

const deepLinksConfig = {
  initialRouteName: 'root',
  screens: {
    // root tab
    root: {
      initialRouteName: 'main_tab',
      screens: {
        main_tab: 'main',
        announcement_tab: {
          initialRouteName: 'announcement_main',
          screens: {
            announcement_main: 'announcement',
            announcement_bookmark: 'announcement/bookmark',
            announcement_search: 'announcement/search',
          },
        },
        student_id_tab: 'main/student_id',
        uos_lifestyle_tab: 'main/uos_lifestyle',
        mypage_tab: {
          initialRouteName: 'mypage_main',
          screens: {
            mypage_main: 'mypage',
            mypage_account: {
              initialRouteName: 'mypage_account_main',
              screens: {
                mypage_account_main: 'mypage/account',
                mypage_account_change_nickname:
                  'mypage/account/change_nickname',
                mypage_account_portal_authentication:
                  'mypage/account/portal_authentication',
                mypage_account_portal_authentication_management:
                  'mypage/account/portal_authentication_management',
              },
            },
            mypage_app_setting: 'mypage/app_setting',
            mypage_app_information: {
              initialRouteName: 'mypage_app_information_main',
              screens: {
                mypage_app_information_main: 'mypage/app_information',
                mypage_app_information_tos: 'mypage/app_information/tos',
                mypage_app_information_privacy_policies:
                  'mypage/app_information/privacy_policies',
                mypage_app_information_advertising_and_marketing:
                  'mypage/app_information/advertising_and_marketing',
              },
            },
          },
        },
      },
    },

    // main
    library: {
      initialRouteName: 'library_main',
      screens: {
        library_main: 'library',
        library_room_status: {
          initialRouteName: 'library_room_status_main',
          screens: {
            library_room_status_main: 'library/room_status',
            library_room_status_seating_chart:
              'library/room_status/seating_chart/:roomNumber',
          },
        },
        library_ranking: 'library/ranking',
        library_challenge: 'library/challenge',
        library_portal_authentication: 'library/portal_authentication',
      },
    },
    cafeteria: 'cafeteria',
    roulette: 'roulette',

    // announcement
    announcement_detail: 'announcement/detail/:id/:origin',

    // uos_lifestyle
    library_recap: 'library_recap',
    meeting: 'meeting',
    check_grade: 'check_grade',
    restaurant: 'restaurant',
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: DEEPLINK_PREFIX_URL,
  // @ts-ignore
  config: deepLinksConfig,
  async getInitialURL() {
    // 딥링크를 이용해서 앱이 오픈되었을 때
    const url = await Linking.getInitialURL();

    if (url != null) {
      storage.set('openedDeepLinkUrl', url);
      // await Linking.openURL(url);
      return null;
    }

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
