import {Platform} from 'react-native';

export default {
  UOSTORY: 'https://uostory.uos.ac.kr/site/main/index003',
  PAYCO: {
    PAYCO_PAYMENT: Platform.select({
      ios: 'payco://open/home/widgetPayment',
      android: 'payco://open',
    }),
    PAYCO_INSTALL: Platform.select({
      ios: 'https://apps.apple.com/kr/app/%ED%8E%98%EC%9D%B4%EC%BD%94-payco-%ED%98%9C%ED%83%9D%EA%B9%8C%EC%A7%80-%EB%98%91%EB%98%91%ED%95%9C-%EA%B0%84%ED%8E%B8%EA%B2%B0%EC%A0%9C/id924292102',
      android:
        'https://play.google.com/store/apps/details?id=com.nhnent.payapp&hl=ko-KR',
    }),
  },
  APP_INFORMATION: {
    TO_SAND_POLICIES: 'https://www.uoslife.team/notices/6',
    PRIVACY_AND_POLICIES: 'https://www.uoslife.team/notices/5',
    ADVERTISING_AND_MARKETING_CONSENT: 'https://www.uoslife.team/notices/7',
  },
  KAKAOTALK_UOSLIFE: 'https://pf.kakao.com/_gMEHK',
  CONTACT_UOSLIFE:
    'https://even-maize-68a.notion.site/55eb7b449c9b461c8ba1c3a01a6209e1',
  UOSLIFE_INSTALL: Platform.select({
    ios: 'https://apps.apple.com/in/app/%EC%8B%9C%EB%8C%80%EC%83%9D-%EB%82%B4-%EC%86%90%EC%95%88%EC%9D%98-%EC%84%9C%EC%9A%B8%EC%8B%9C%EB%A6%BD%EB%8C%80%ED%95%99%EA%B5%90/id1514073192',
    android:
      'https://play.google.com/store/apps/details?id=com.beyondconnect.uoslife',
    default:
      'https://play.google.com/store/apps/details?id=com.beyondconnect.uoslife',
  }),
};
