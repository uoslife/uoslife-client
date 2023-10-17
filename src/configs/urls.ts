import {Platform} from 'react-native';

export default {
  UOSTORY: 'https://uostory.uos.ac.kr/site/main/index003',
  PAYCO: {
    PAYCO_PAYMENT: 'payco://open/home/widgetPayment',
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
};
