import React, {FC, useState} from 'react';
import BottomSheet from '../components/modals/BottomSheet';

const useBottomSheet = () => {
  const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactElement>(<></>);
  const [bottomSheetZIndex, setBottomSheetZIndex] = useState(10);

  return {
    BottomSheet: bottomSheetOpened
      ? () => (
          <BottomSheet zIndex={bottomSheetZIndex}>
            {bottomSheetContent}
          </BottomSheet>
        )
      : () => null,
    openBottomSheet: () => setBottomSheetOpened(true),
    closeBottomSheet: () => setBottomSheetOpened(false),
    setBottomSheetContent,
    setBottomSheetZIndex,
  };
};

export default useBottomSheet;
