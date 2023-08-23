import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';
import {Image, View} from 'react-native';
import {Button, Txt, colors} from '@uoslife/design-system';

type BottomSheetOption = {
  text: string;
  description?: string;
  onPressArrow: () => void;
  toggleChecked: () => void;
  checked: boolean;
};

type BottomSheet = {
  withHandleBar?: true;
  options: BottomSheetOption[];
  onPressBtn: () => void;
  btnEnabled: boolean;
};

// 모달은 항상 바텀시트보다 위에 있습니다
// 배경을 누르면 사라집니다(기본값). setModalBgOnpress를 통해 수정 가능합니다.
const useBottomSheet = ({
  onPressBtn,
  options,
  withHandleBar,
  btnEnabled,
}: BottomSheet) => {
  const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
  const [bottomSheetBgDark, setBottomSheetBgDark] = useState<boolean>(true);

  // 아이콘: 라이브러리의 것으로 대체 필요
  const RightArrowIcon = () => (
    <Image source={require('../assets/images/right_arrow.png')} />
  );
  const CheckUncheckedImage = () => (
    <Image source={require('../assets/images/check_unchecked.png')} />
  );

  const BottomSheetContent = () => {
    return (
      <>
        <S.options>
          {options.map((option, i) => (
            <S.optionContainer
              borderColor={colors.grey40}
              isFirst={i === 0}
              key={i}>
              {/* 아이콘 대체 전 임시로 */}
              <View style={{padding: 8}}>
                <CheckUncheckedImage />
              </View>
              <S.optionDetail>
                <S.optionTextsContainer>
                  <Txt
                    label={option.text}
                    color="grey190"
                    typograph="bodyLarge"
                  />
                  {option?.description && (
                    <Txt
                      label={option.description}
                      color="grey130"
                      typograph="bodySmall"
                    />
                  )}
                </S.optionTextsContainer>
                <RightArrowIcon />
              </S.optionDetail>
            </S.optionContainer>
          ))}
        </S.options>
        <S.btnContainer>
          <Button
            size={'large'}
            isEnabled={btnEnabled}
            isFullWidth
            label={'Button'}
          />
        </S.btnContainer>
      </>
    );
  };

  return {
    renderBottomSheet: () =>
      bottomSheetOpened && (
        <S.bottomSheetWrapper>
          <S.bottomSheetBg
            bgDark={bottomSheetBgDark}
            zIndex={5}
            onPress={() => {
              setBottomSheetOpened(false);
            }}
          />
          <S.bottomSheetContainer zIndex={5}>
            <BottomSheetContent />
          </S.bottomSheetContainer>
        </S.bottomSheetWrapper>
      ),
    openBottomSheet: () => {
      setBottomSheetOpened(true);
    },
    closeBottomSheet: () => {
      setBottomSheetOpened(false);
    },
    activateBottomSheetBgDark: () => {
      setBottomSheetBgDark(true);
    },
    deactivateBottomSheetBgDark: () => {
      setBottomSheetBgDark(false);
    },
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
  bottomSheetContainer: styled.View<{
    zIndex: number;
  }>`
    background-color: white;
    width: 100%;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    z-index: ${({zIndex}) => zIndex};
  `,
  options: styled.View`
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;

    display: flex;
    gap: 8px;
  `,
  optionContainer: styled.View<{isFirst?: boolean; borderColor: string}>`
    display: flex;
    flex-direction: row;
    gap: 4px;

    padding-left: 8px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;

    width: 100%;

    ${({isFirst, borderColor}) =>
      isFirst
        ? `margin-bottom: 8px; border-bottom-width: 1px; border-color: ${borderColor}`
        : ''}
  `,
  optionDetail: styled.Pressable`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 4px;

    padding-top: 8px;
    padding-bottom: 8px;

    flex: 1;
  `,
  optionTextsContainer: styled.View`
    display: flex;
    gap: 4px;
  `,
  btnContainer: styled.View`
    padding: 8px 16px 8px 16px;
    width: 100%;
  `,
};

export default useBottomSheet;
