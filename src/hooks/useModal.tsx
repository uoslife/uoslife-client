import {useState} from 'react';
import {View} from 'react-native';
import ModalLayout from '../components/molecules/overlays/layouts/ModalLayout';
import BottomSheetLayout from '../components/molecules/overlays/layouts/BottomSheetLayout';
import TextMessageModalLayout from '../components/molecules/overlays/layouts/TextMessageModalLayout';

type UseModalParams =
  /** 레이아웃(위치, height / width / border 등 스타일 스펙) 지정 */
  | 'MODAL'
  | 'BOTTOM_SHEET'
  | 'TEXT_MODAL_RIGHT'
  | 'TEXT_MODAL_CENTER'
  | 'TEXT_MODAL_LEFT';

type UseModalReturnValue = [
  () => void,
  () => void,
  ({children}: {children: React.ReactNode}) => React.JSX.Element,
];

const useModal = (modalType: UseModalParams): UseModalReturnValue => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  // eslint-disable-next-line consistent-return
  const Modal = ({children}: {children: React.ReactNode}) => {
    if (!isOpen) return <View />;

    switch (modalType) {
      case 'MODAL':
        return (
          <ModalLayout bgDark onPressBg={() => {}}>
            {children}
          </ModalLayout>
        );
      case 'BOTTOM_SHEET':
        return (
          <BottomSheetLayout bgDark onPressBg={close}>
            {children}
          </BottomSheetLayout>
        );
      case 'TEXT_MODAL_LEFT':
        return (
          <TextMessageModalLayout tail="LEFT" onPress={close}>
            {children}
          </TextMessageModalLayout>
        );
      case 'TEXT_MODAL_CENTER':
        return (
          <TextMessageModalLayout tail="CENTER" onPress={close}>
            {children}
          </TextMessageModalLayout>
        );
      case 'TEXT_MODAL_RIGHT':
        return (
          <TextMessageModalLayout tail="RIGHT" onPress={close}>
            {children}
          </TextMessageModalLayout>
        );
    }
  };

  return [open, close, Modal];
};

export default useModal;
