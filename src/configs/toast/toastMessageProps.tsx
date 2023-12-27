import {Linking} from 'react-native';
import {ShowToastProps} from '.';
import urls from '../urls';

const toastMessage = {
  logout: '로그아웃에 성공했어요.',
  unregister: '회원탈퇴에 성공했어요.',
  unregisterError: '회원탈퇴를 처리하는 중 문제가 발생했어요.',
  signUpError: '회원가입을 처리하는 중 문제가 발생했어요.',
  notLoggedInError: '로그인 후 이용 가능해요.',
  changeNickname: '닉네임 변경에 성공했어요.',
  changeNicknameError: '닉네임을 변경하는 중 문제가 발생했어요.',
  changePhone: '전화번호 변경에 성공했어요.',
  changePhoneError: '전화번호를 변경하는 중 문제가 발생했어요.',
  portalAuthenticationSuccess: '포털 연동을 성공적으로 완료했어요.',
  portalAuthenticationError: '포털 연동을 처리하는 중 문제가 발생했어요.',
  portalAuthenticationDuplicatedError: '중복된 포털 연동 요청이에요.',
  notificationError: '알림 설정을 처리하는 중 문제가 발생했어요.',
  unRegisterTwiceUserError: '회원탈퇴 이력이 2회 이상인 유저입니다.',

  SmsVerificationError: '전화번호 인증 과정에서 문제가 발생했어요.',
  loginDurationExpiredInfo: '로그인 기한이 만료되었어요.',
};
const toastMessageSubTitle = {
  waitForRestart: '잠시후 다시 시도해주세요.',
  unRegisterTwiceUserErrorSubTitle:
    '해당 팝업을 클릭하여 고객센터로 문의해주세요.',
};

export type ToastMessageType = keyof typeof toastMessage;

const toastMessageProps: {[T in ToastMessageType]: ShowToastProps} = {
  logout: {
    title: toastMessage.logout,
  },
  unregister: {
    title: toastMessage.unregister,
  },
  unregisterError: {
    type: 'error',
    title: toastMessage.unregisterError,
  },
  signUpError: {
    type: 'error',
    title: toastMessage.signUpError,
  },
  notLoggedInError: {
    type: 'error',
    title: toastMessage.notLoggedInError,
  },
  changeNickname: {
    title: toastMessage.changeNickname,
  },
  changeNicknameError: {
    type: 'error',
    title: toastMessage.changeNicknameError,
  },
  changePhone: {
    title: toastMessage.changePhone,
  },
  changePhoneError: {
    type: 'error',
    title: toastMessage.changePhoneError,
  },
  portalAuthenticationSuccess: {
    title: toastMessage.portalAuthenticationSuccess,
  },
  portalAuthenticationError: {
    type: 'error',
    title: toastMessage.portalAuthenticationError,
  },
  portalAuthenticationDuplicatedError: {
    type: 'error',
    title: toastMessage.portalAuthenticationDuplicatedError,
  },
  notificationError: {
    type: 'error',
    title: toastMessage.notificationError,
  },
  unRegisterTwiceUserError: {
    type: 'error',
    title: toastMessage.unRegisterTwiceUserError,
    subTitle: toastMessageSubTitle.unRegisterTwiceUserErrorSubTitle,
    onPress: () => {
      Linking.openURL(urls.CONTACT_UOSLIFE);
    },
    autoHide: false,
  },
  SmsVerificationError: {
    type: 'error',
    title: toastMessage.SmsVerificationError,
    subTitle: toastMessageSubTitle.waitForRestart,
  },
  loginDurationExpiredInfo: {
    type: 'info',
    visibilityTime: 8000,
    title: toastMessage.loginDurationExpiredInfo,
  },
};
export default toastMessageProps;
