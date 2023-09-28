import {useState} from 'react';
import {View} from 'react-native';
import BottomSheetLayout from '../components/overlays/bottom-sheet/BottomSheetLayout';

type UseBottomSheetReturnValue = {
  renderBottomSheet: () => React.ReactNode;
  setBottomSheetContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setBottomSheetBgDark: React.Dispatch<React.SetStateAction<boolean>>;
  setBottomSheetCloseOnBgPress: React.Dispatch<React.SetStateAction<boolean>>;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  activateBgDark: () => void;
  deactivateBgDark: () => void;
};

const useBottomSheet = (): UseBottomSheetReturnValue => {
  const [bottomSheetOpened, setModalOpened] = useState(false);
  const [bottomSheetBgDark, setBottomSheetBgDark] = useState(true);
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>(null);
  const [bottomSheetCloseOnBgPress, setBottomSheetCloseOnBgPress] =
    useState(false);

  return {
    renderBottomSheet: () =>
      bottomSheetOpened && (
        <BottomSheetLayout>{bottomSheetContent}</BottomSheetLayout>
      ),
    setBottomSheetContent,
    setBottomSheetBgDark,
    setBottomSheetCloseOnBgPress,
    openBottomSheet: () => {
      setModalOpened(true);
    },
    closeBottomSheet: () => {
      setModalOpened(false);
    },
    activateBgDark: () => {
      setBottomSheetBgDark(true);
    },
    deactivateBgDark: () => {
      setBottomSheetBgDark(false);
    },
  };
};

export default useBottomSheet;
