import {ShowToastProps} from '.';

const toastMessage = {
  logout: '로그아웃에 성공했어요.',
  unregister: '회원탈퇴에 성공했어요.',
  unregisterError: '회원탈퇴를 처리하는 중 오류가 발생했어요.',
  notLoggedInError: '로그인 후 이용 가능해요.',
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
  notLoggedInError: {
    type: 'error',
    title: toastMessage.notLoggedInError,
  },
};
export default toastMessageProps;
