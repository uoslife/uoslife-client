import {useState} from 'react';
import ModalLayout from '../components/overlays/layouts/ModalLayout';
import BottomSheetLayout from '../components/overlays/layouts/BottomSheetLayout';

type UseModalParams = {
  // 레이아웃(위치, height / width / border 등 스타일 스펙) 지정
  layout: 'modal' | 'bottom-sheet';
  // 배경을 누르면 사라지게 할 것인지 여부
  closeOnBgPress?: boolean;
};

type UseModalReturnValue = [
  () => void,
  () => void,
  () => React.ReactNode,
  React.Dispatch<React.SetStateAction<React.ReactNode>>,
];

interface UseModal {
  (params: UseModalParams): UseModalReturnValue;
}

const useModal: UseModal = ({layout, closeOnBgPress}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const Component = () => {
    const onPressBg = () => {
      if (closeOnBgPress) {
        close();
      }
    };

    switch (layout) {
      case 'modal':
        return (
          <ModalLayout bgDark onPressBg={onPressBg}>
            {content}
          </ModalLayout>
        );
      case 'bottom-sheet':
        return (
          <BottomSheetLayout bgDark onPressBg={onPressBg}>
            {content}
          </BottomSheetLayout>
        );
    }
  };

  return [open, close, () => isOpen && <Component />, setContent];
};

export default useModal;
