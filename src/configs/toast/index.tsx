import Toast, {ToastShowParams} from 'react-native-toast-message';
import toastMessageProps, {ToastMessageType} from './toastMessageProps';

export type ShowToastProps = {
  title?: string;
  subTitle?: string;
} & Omit<ToastShowParams, 'text1' | 'text2'>;

const showToast = ({title, subTitle, ...args}: ShowToastProps) => {
  Toast.show({
    text1: title,
    text2: subTitle,
    ...args,
  });
};

const customShowToast = (toastMessageKey: ToastMessageType) => {
  showToast({...toastMessageProps[toastMessageKey]});
};

export default customShowToast;
