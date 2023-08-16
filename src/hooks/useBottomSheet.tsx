import React, {FC, useState, useEffect, useMemo} from 'react';
import BottomSheet from '../components/overlay/BottomSheet';
import styled from '@emotion/native';

// 배경을 누르면 사라집니다..
const useBottomSheet = () => {
  const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactElement>(<></>);
  const [bottomSheetZIndex, setBottomSheetZIndex] = useState<number>(5);
  const [bottomSheetBgDark, setBottomSheetBgDark] = useState<boolean>(true);

  const [bottomSheetBgOnpress, setBottomSheetBgOnpress] = useState<() => void>(
    () => {},
  );

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

  // 배경을 누르면 사라지도록 초기화
  useEffect(() => {
    setBottomSheetBgOnpress(() => closeBottomSheet);
  }, []);

  const BottomSheetComponent = useMemo(
    () => () =>
      bottomSheetOpened && (
        <S.bottomSheetWrapper>
          <S.bottomSheetBg
            bgDark={bottomSheetBgDark}
            zIndex={bottomSheetZIndex}
            onPress={bottomSheetBgOnpress}
          />
          <BottomSheet zIndex={bottomSheetZIndex}>
            {bottomSheetContent}
          </BottomSheet>
        </S.bottomSheetWrapper>
      ),
    [
      bottomSheetOpened,
      bottomSheetBgDark,
      bottomSheetZIndex,
      bottomSheetBgOnpress,
      bottomSheetContent,
    ],
  );

  return {
    BottomSheet: () =>
      bottomSheetOpened && (
        <S.bottomSheetWrapper>
          <S.bottomSheetBg
            bgDark={bottomSheetBgDark}
            zIndex={bottomSheetZIndex}
            onPress={bottomSheetBgOnpress}
          />
          <BottomSheet zIndex={bottomSheetZIndex}>
            {bottomSheetContent}
          </BottomSheet>
        </S.bottomSheetWrapper>
      ),
    openBottomSheet,
    closeBottomSheet,
    setBottomSheetContent,
    setBottomSheetZIndex,
    activateBottomSheetBgDark,
    deactivateBottomSheetBgDark,
    setBottomSheetBgOnpress,
  };
};

interface StyledBgProps {
  zIndex: number;
  bgDark: boolean;
}

const S = {
  bottomSheetWrapper: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  bottomSheetBg: styled.Pressable<StyledBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
    z-index: ${({zIndex}) => zIndex};
  `,
};

export default useBottomSheet;
