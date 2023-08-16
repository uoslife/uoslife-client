import styled from '@emotion/native';
import React, {useEffect} from 'react';

interface BottomSheetProps {
  children: React.ReactNode | React.ReactNode[];
  zIndex: number;
}

const BottomSheet = ({children, zIndex}: BottomSheetProps) => {
  useEffect(() => {
    console.log('BottomSheet mounted');

    return () => {
      console.log('BottomSheet unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('BottomSheet rendered');
  });

  return <S.bottomContent zIndex={zIndex}>{children}</S.bottomContent>;
};

export default BottomSheet;

interface WrapperProps {
  zIndex: number;
}

const S = {
  bottomContent: styled.View<WrapperProps>`
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 24px;
    padding-bottom: 28px;
    background-color: white;
    width: 100%;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    z-index: ${({zIndex}) => zIndex};
  `,
};
