import React, {useState, useEffect, useMemo} from 'react';
import styled from '@emotion/native';
import {Image, View} from 'react-native';
import {Button, Txt, colors} from '@uoslife/design-system';
import ToggleSwitch from '../components/toggleSwitch/ToggleSwitch';

type CheckOption = {
  text: string;
  supportingText?: string;
  checkBtnAdditionalHandler?: () => void; // 체크박스 영역 터치시 추가로 실행
  bodyAreaPressHandler: () => void; // 텍스트 + 화살표 영역 터치시 실행
};

type ToggleOption = {
  text: string;
  initialIsOn: boolean; // toggle의 경우 isOn의 초깃값을 필요로 함
  pressAdditionalHandler?: () => void;
};

type BottomSheetHookParams = {
  withHandleBar?: true;
  bottomSheetBtnHandler: () => void;
  btnEnabled: boolean;
  checkOptions?: unknown; // destructuring 시 오류방지용
  toggleOptions?: unknown; // destructuring 시 오류방지용
  entireSelectOption?: unknown; // destructuring 시 오류방지용
} & (
  | {
      bottomSheetType: 'checkbox';
      title?: undefined;
      entireSelectOption: CheckOption; // "전체 선택"을 위한 옵션
      checkOptions: CheckOption[]; // 이외 약관들
    }
  | {
      bottomSheetType: 'toggle';
      title: string;
      toggleOptions: ToggleOption[];
    }
);

// 아이콘: 라이브러리의 것으로 대체 필요
const RightArrowIcon = () => (
  <Image source={require('../assets/images/right_arrow.png')} />
);
const CheckUncheckedImage = () => (
  <Image source={require('../assets/images/check_unchecked.png')} />
);
const CheckCheckedImage = () => (
  <Image source={require('../assets/images/check_checked.png')} />
);

const CheckboxContent = ({
  entireSelectOption,
  checkOptions,
  setStatesToExport,
}: {
  entireSelectOption: CheckOption;
  checkOptions: CheckOption[];
  setStatesToExport: React.Dispatch<React.SetStateAction<StatesToExport>>;
}) => {
  const optionLength = checkOptions.length;
  const arrayFilledWithFalse = new Array(optionLength).fill(false);
  const arrayFilledWithTrue = new Array(optionLength).fill(true);

  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([
    ...arrayFilledWithFalse,
  ]);
  const checkedAll = isCheckedArray.every(checked => checked);

  // 외부 state와 동기화
  useEffect(() => {
    setStatesToExport({isCheckedArray, checkedAll});
  }, [isCheckedArray, checkedAll]);

  return (
    <S.checkbox.wrapper>
      <S.checkbox.itemContainer
        borderColor={checkedAll ? colors.primaryBrand : colors.grey40}
        borderBottomWidth={checkedAll ? 2 : 1}
        isFirst>
        <S.checkbox.checkIconContainer
          onPress={() => {
            setIsCheckedArray(
              checkedAll ? arrayFilledWithFalse : arrayFilledWithTrue,
            );
            // checkBtnAdditionalHandler: 있을 때만 실행
            if (entireSelectOption.checkBtnAdditionalHandler)
              entireSelectOption.checkBtnAdditionalHandler();
          }}>
          {checkedAll ? <CheckCheckedImage /> : <CheckUncheckedImage />}
        </S.checkbox.checkIconContainer>
        <S.checkbox.itemBody
          onPress={() => {
            entireSelectOption.bodyAreaPressHandler();
          }}>
          <S.checkbox.textContainer>
            <Txt
              label={entireSelectOption.text}
              color="grey190"
              typograph="bodyLarge"
            />
            {entireSelectOption?.supportingText && (
              <Txt
                label={entireSelectOption.supportingText}
                color="grey130"
                typograph="bodySmall"
              />
            )}
          </S.checkbox.textContainer>
          <RightArrowIcon />
        </S.checkbox.itemBody>
      </S.checkbox.itemContainer>
      {checkOptions.map((option, i) => (
        <S.checkbox.itemContainer key={i}>
          <S.checkbox.checkIconContainer
            onPress={() => {
              const copied = [...isCheckedArray];
              copied[i] = !copied[i];
              setIsCheckedArray(copied);
              // checkBtnAdditionalHandler: 있을 때만 실행
              if (option.checkBtnAdditionalHandler)
                option.checkBtnAdditionalHandler();
            }}>
            {isCheckedArray[i] ? (
              <CheckCheckedImage />
            ) : (
              <CheckUncheckedImage />
            )}
          </S.checkbox.checkIconContainer>
          <S.checkbox.itemBody onPress={option.bodyAreaPressHandler}>
            <S.checkbox.textContainer>
              <Txt label={option.text} color="grey190" typograph="bodyLarge" />
              {option?.supportingText && (
                <Txt
                  label={option.supportingText}
                  color="grey130"
                  typograph="bodySmall"
                />
              )}
            </S.checkbox.textContainer>
            <RightArrowIcon />
          </S.checkbox.itemBody>
        </S.checkbox.itemContainer>
      ))}
    </S.checkbox.wrapper>
  );
};

const ToggleContent = ({
  toggleOptions,
  title,
  setStatesToExport,
}: {
  toggleOptions: ToggleOption[];
  title: string;
  setStatesToExport: React.Dispatch<React.SetStateAction<StatesToExport>>;
}) => {
  const [isOnArray, setIsOnArray] = useState<boolean[]>(
    toggleOptions.map(option => option.initialIsOn),
  );

  // 외부 state와 동기화
  useEffect(() => {
    setStatesToExport({isOnArray});
  }, [setStatesToExport, isOnArray]);

  return (
    <S.toggle.wrapper>
      <View style={{paddingBottom: 12, paddingTop: 12}}>
        <Txt color={'grey190'} label={title} typograph={'titleMedium'} />
      </View>
      {toggleOptions.map((option, i) => {
        const onToggle = () => {
          const copied = [...isOnArray];
          copied[i] = !copied[i];
          setIsOnArray(copied);
        };

        return (
          <S.toggle.itemContainer onPress={onToggle} key={i}>
            <Txt label={option.text} color="grey190" typograph="bodyLarge" />
            <ToggleSwitch
              onToggle={onToggle}
              isOn={isOnArray[i]}
              size={'medium'}
            />
          </S.toggle.itemContainer>
        );
      })}
    </S.toggle.wrapper>
  );
};

type StatesToExport = {
  isCheckedArray?: any;
  checkedAll?: any;
  isOnArray?: any;
};

// 모달은 항상 바텀시트보다 위에 있습니다.
// 배경을 누르면 사라집니다(기본값). setBottomSheetCloseOnBgPress를 통해 수정 가능합니다.
// 배경은 까맣게 처리됩니다(기본값). setBottomSheetBgDark를 통해 수정 가능합니다.
// <checkbox에서는 checked, toggle에서는 isOn> state 관리 로직이 주입되어 있습니다. 추가 listener도 부착 가능합니다.
// bottomSheetBtnHandler는 btnEnabled와는 독립적으로 작동하니 주의해주세요. btnEnabled는 표시 형식과만 관계합니다.
const useBottomSheet = ({
  bottomSheetBtnHandler,
  checkOptions,
  toggleOptions,
  entireSelectOption,
  withHandleBar,
  btnEnabled,
  bottomSheetType,
  title,
}: BottomSheetHookParams) => {
  const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
  const [bottomSheetBgDark, setBottomSheetBgDark] = useState<boolean>(true);
  const [bottomSheetCloseOnBgPress, setBottomSheetCloseOnBgPress] =
    useState<boolean>(true);
  const [statesToExport, setStatesToExport] = useState<StatesToExport>({});

  // 무한 리렌더링 방지를 위한 useMemo 이용
  const BottomSheetContent = useMemo(
    () => () =>
      bottomSheetType === 'checkbox' ? (
        <CheckboxContent
          checkOptions={checkOptions}
          entireSelectOption={entireSelectOption}
          setStatesToExport={setStatesToExport}
        />
      ) : (
        <ToggleContent
          setStatesToExport={setStatesToExport}
          title={title}
          toggleOptions={toggleOptions}
        />
      ),
    [],
  );

  return {
    renderBottomSheet: () =>
      bottomSheetOpened && (
        <S.bottomSheetWrapper>
          <S.bottomSheetBg
            bgDark={bottomSheetBgDark}
            zIndex={5}
            onPress={() => {
              if (bottomSheetCloseOnBgPress) setBottomSheetOpened(false);
            }}
          />
          <S.bottomSheetContentContainer zIndex={5}>
            <BottomSheetContent />
            <S.btnContainer>
              <Button
                onPress={bottomSheetBtnHandler}
                size={'large'}
                isEnabled={btnEnabled}
                isFullWidth
                label={'Button'}
              />
            </S.btnContainer>
          </S.bottomSheetContentContainer>
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
    setBottomSheetCloseOnBgPress,
    ...statesToExport,
  };
};

const S = {
  bottomSheetWrapper: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  bottomSheetBg: styled.Pressable<{
    zIndex: number;
    bgDark: boolean;
  }>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
    z-index: ${({zIndex}) => zIndex};
  `,
  bottomSheetContentContainer: styled.View<{
    zIndex: number;
  }>`
    background-color: white;
    width: 100%;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    z-index: ${({zIndex}) => zIndex};
  `,
  checkbox: {
    wrapper: styled.View`
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 12px;

      display: flex;
      gap: 8px;
    `,
    itemContainer: styled.View<
      | {
          isFirst: true;
          borderColor: string;
          borderBottomWidth: number;
        }
      | {
          isFirst?: false;
          borderColor?: unknown;
          borderBottomWidth?: unknown;
        }
    >`
      display: flex;
      flex-direction: row;
      gap: 4px;

      padding-left: 8px;
      padding-right: 16px;
      padding-top: 8px;
      padding-bottom: 8px;

      width: 100%;

      ${({isFirst, borderColor, borderBottomWidth}) =>
        isFirst
          ? // 레이아웃 가라앉음 방지를 위한 border에 따라 margin 조정
            `margin-bottom: ${
              8 - borderBottomWidth
            }px; border-bottom-width: ${borderBottomWidth}px; border-color: ${borderColor};`
          : ''}
    `,
    checkIconContainer: styled.Pressable`
      padding: 8px;
    `,
    itemBody: styled.Pressable`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 4px;

      padding-top: 8px;
      padding-bottom: 8px;

      flex: 1;
    `,
    textContainer: styled.View`
      display: flex;
      gap: 4px;
    `,
  },
  toggle: {
    wrapper: styled.View`
      padding: 16px 24px 12px 24px;

      display: flex;
      gap: 8px;
    `,
    itemContainer: styled.Pressable`
      display: flex;
      flex-direction: row;

      justify-content: space-between;
      padding-top: 12px;
      padding-bottom: 12px;
    `,
  },
  btnContainer: styled.View`
    padding: 8px 16px 8px 16px;
    width: 100%;
  `,
};

export default useBottomSheet;
