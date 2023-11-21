import {ShowToastProps} from '.';

const toastMessage = {
  logout: '로그아웃에 성공했습니다.',
  unregister: '회원탈퇴에 성공했습니다.',
  unregisterError: '회원탈퇴를 처리하는 중 오류가 발생했습니다.',
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
};
export default toastMessageProps;
