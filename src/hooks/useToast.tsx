import {useState} from 'react';
import {View} from 'react-native';
import InformationToast from '../components/molecules/overlays/layouts/InformationToast';

type ToastType = 'ERROR' | 'COMPLETE';
type UseToastReturnValue = [() => void, () => React.JSX.Element];

const useToast = (toastType: ToastType, text: string): UseToastReturnValue => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };
  const Toast = () => {
    if (!isOpen) return <View />;
    //확장성을 위한 분기 처리
    switch (toastType) {
      case 'ERROR':
        return <InformationToast toastType="ERROR">{text}</InformationToast>;
      case 'COMPLETE':
        return <InformationToast toastType="COMPLETE">{text}</InformationToast>;
    }
  };
  return [open, Toast];
};
export default useToast;
