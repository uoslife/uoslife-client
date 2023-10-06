import {useState} from 'react';
import ModalLayout from '../components/overlays/layouts/ModalLayout';
import BottomSheetLayout from '../components/overlays/layouts/BottomSheetLayout';

type UseModalParams = {
  /** 레이아웃(위치, height / width / border 등 스타일 스펙) 지정 */
  modalType: 'MODAL' | 'BOTTOM_SHEET';

  /** 배경을 누르면 사라지게 할 것인지 여부 */
  closeOnBgPress?: boolean;
};

type UseModalReturnValue = [
  () => void,
  () => void,
  ({children}: {children: React.ReactNode}) => React.JSX.Element,
];

const useModal = ({
  modalType,
  closeOnBgPress = false,
}: UseModalParams): UseModalReturnValue => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  // TODO: onPressBg 로직 변경
  const onPressBg = () => {
    if (closeOnBgPress) {
      close();
    }
  };

  const Modal = ({children}: {children: React.ReactNode}) => {
    if (!isOpen) return <></>;

    switch (modalType) {
      case 'MODAL':
        return (
          <ModalLayout bgDark onPressBg={onPressBg}>
            {children}
          </ModalLayout>
        );
      case 'BOTTOM_SHEET':
        return (
          <BottomSheetLayout bgDark onPressBg={onPressBg}>
            {children}
          </BottomSheetLayout>
        );
    }
  };

  return [open, close, Modal];
};

export default useModal;
