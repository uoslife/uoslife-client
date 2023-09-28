import {useState} from 'react';
import BottomSheetLayout from '../components/overlays/bottom-sheet/BottomSheetLayout';

type UseBottomSheetReturnValue = {
  renderBottomSheet: () => React.ReactNode;
  setBottomSheetContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setBottomSheetBgDark: React.Dispatch<React.SetStateAction<boolean>>;
  setBottomSheetCloseOnBgPress: React.Dispatch<React.SetStateAction<boolean>>;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  activateBottomSheetBgDark: () => void;
  deactivateBottomSheetBgDark: () => void;
};

const useBottomSheet = (): UseBottomSheetReturnValue => {
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>(null);
  const [bottomSheetOpened, setModalOpened] = useState(false);
  const [bottomSheetBgDark, setBottomSheetBgDark] = useState(true);
  const [bottomSheetCloseOnBgPress, setBottomSheetCloseOnBgPress] =
    useState(false);

  const openBottomSheet = () => {
    setModalOpened(true);
  };

  const closeBottomSheet = () => {
    setModalOpened(false);
  };

  const activateBottomSheetBgDark = () => {
    setBottomSheetBgDark(true);
  };

  const deactivateBottomSheetBgDark = () => {
    setBottomSheetBgDark(false);
  };

  const onPressBg = () => {
    if (bottomSheetCloseOnBgPress) {
      closeBottomSheet();
    }
  };

  return {
    renderBottomSheet: () =>
      bottomSheetOpened && (
        <BottomSheetLayout bgDark={bottomSheetBgDark} onPressBg={onPressBg}>
          {bottomSheetContent}
        </BottomSheetLayout>
      ),
    setBottomSheetContent,
    setBottomSheetBgDark,
    setBottomSheetCloseOnBgPress,
    openBottomSheet,
    closeBottomSheet,
    activateBottomSheetBgDark,
    deactivateBottomSheetBgDark,
  };
};

export default useBottomSheet;
