import {useState} from 'react';
import BottomSheetLayout from '../components/overlays/bottom-sheet/BottomSheetLayout';

type UseBottomSheetReturnValue = {
  renderBottomSheet: () => React.ReactNode;
  setBottomSheetContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  activateBottomSheetBgDark: () => void;
  deactivateBottomSheetBgDark: () => void;
  activateBottomSheetCloseOnBgPress: () => void;
  deactivateBottomSheetCloseOnBgPress: () => void;
};

const useBottomSheet = (): UseBottomSheetReturnValue => {
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>(null);
  const [bottomSheetOpened, setBottomSheetOpened] = useState(false);
  const [bottomSheetBgDark, setBottomSheetBgDark] = useState(true);
  const [bottomSheetCloseOnBgPress, setBottomSheetCloseOnBgPress] =
    useState(false);

  const openBottomSheet = () => {
    setBottomSheetOpened(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetOpened(false);
  };

  const activateBottomSheetBgDark = () => {
    setBottomSheetBgDark(true);
  };

  const deactivateBottomSheetBgDark = () => {
    setBottomSheetBgDark(false);
  };

  const activateBottomSheetCloseOnBgPress = () => {
    setBottomSheetCloseOnBgPress(true);
  };

  const deactivateBottomSheetCloseOnBgPress = () => {
    setBottomSheetCloseOnBgPress(false);
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
    openBottomSheet,
    closeBottomSheet,
    activateBottomSheetBgDark,
    deactivateBottomSheetBgDark,
    activateBottomSheetCloseOnBgPress,
    deactivateBottomSheetCloseOnBgPress,
  };
};

export default useBottomSheet;
