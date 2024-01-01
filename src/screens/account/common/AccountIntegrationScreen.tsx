import React from 'react';
import {Dimensions, Pressable, View} from 'react-native';
import {useAtom, useAtomValue} from 'jotai';
import styled from '@emotion/native';
import {Txt, Button, colors} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../../../components/molecules/common/header/Header';
import {
  ExistedAccountInfoType,
  existedAccountInfoAtom,
} from '../../../store/account';
import useAccountFlow from '../../../hooks/useAccountFlow';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const HEADER_TO_TXT_HEIGHT = 270 + 100; // 헤더부터 설명 문구('선택한 ~ 삭제됩니다')까지의 높이

const ExistedAccountInfoList = () => {
  const [existedAccountInfo, setExistedAccountInfo] = useAtom(
    existedAccountInfoAtom,
  );

  const selectExistedAccount = (selectedAccount: ExistedAccountInfoType) => {
    setExistedAccountInfo(prev => {
      return prev.map(prevItem =>
        prevItem.id === selectedAccount.id
          ? {...prevItem, isSelected: true}
          : {...prevItem, isSelected: false},
      );
    });
  };

  // accountInfo에 기존 nickname이 존재하지 않는 경우 || 기존 accountInfo가 없는 경우
  if (
    !existedAccountInfo.some(item => item.nickname) ||
    existedAccountInfo.length === 0
  ) {
    const firstItem = existedAccountInfo[0];
    return (
      <View>
        <Pressable onPress={() => selectExistedAccount(firstItem)}>
          <S.idButtonSelected isSelected={firstItem.isSelected}>
            <Txt label="" color="grey190" typograph="titleMedium" />
          </S.idButtonSelected>
        </Pressable>
      </View>
    );
  }

  return existedAccountInfo.map(item => (
    <View key={item.id}>
      {item.nickname && (
        <Pressable onPress={() => selectExistedAccount(item)}>
          <S.idButtonSelected isSelected={item.isSelected}>
            <Txt
              label={item.nickname}
              color="grey190"
              typograph="titleMedium"
            />
          </S.idButtonSelected>
        </Pressable>
      )}
    </View>
  ));
};

const AccountIntegrationScreen = () => {
  const insets = useSafeAreaInsets();
  const existedAccountInfo = useAtomValue(existedAccountInfoAtom);
  const {changeAccountFlow, increaseSignUpFlowStep} = useAccountFlow();

  const handlePressHeaderBackButton = () =>
    changeAccountFlow({
      commonFlowName: 'SIGNIN',
      isResetSignUpFlow: true,
    });

  const handlePressNextButton = () => {
    const hasSelected = existedAccountInfo.some(
      item => item.isSelected === true,
    );
    if (!hasSelected) return;

    increaseSignUpFlowStep();
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header
        label="계정 통합"
        onPressBackButton={handlePressHeaderBackButton}
      />
      <S.accountIntegrationContainer>
        <View style={{gap: 24}}>
          <View style={{gap: 8}}>
            <Txt
              label={'통합하고자 하는\n아이디를 선택해주세요.'}
              color="grey190"
              typograph="headlineMedium"
            />
            <Txt
              label="선택한 계정을 제외한 기존 계정은 삭제됩니다."
              color="grey190"
              typograph="bodyMedium"
            />
          </View>
          <S.idContainer
            style={{height: DEVICE_HEIGHT - HEADER_TO_TXT_HEIGHT, right: 1}}>
            <ExistedAccountInfoList />
            <S.dummyBox />
          </S.idContainer>
        </View>
        <S.buttonArea style={{bottom: insets.bottom - 8}}>
          <Button
            label="계정 통합하기"
            onPress={handlePressNextButton}
            isEnabled={existedAccountInfo.some(
              item => item.isSelected === true,
            )}
            isFullWidth
          />
        </S.buttonArea>
      </S.accountIntegrationContainer>
    </S.screenContainer>
  );
};

const getBorderColor = (isSelected?: boolean) => {
  switch (isSelected) {
    case true:
      return colors.primaryBrand;
    case false:
      return colors.grey40;
    default:
      return colors.grey40;
  }
};

export default AccountIntegrationScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  accountIntegrationContainer: styled.View`
    flex: 1;
    padding: 28px 16px 0;
  `,
  idContainer: styled.ScrollView`
    padding-bottom: 16px;
  `,
  idButtonSelected: styled.View<{isSelected?: boolean}>`
    border-radius: 10px;
    margin-bottom: 16px;
    padding: 16px;
    border: 2px solid ${({isSelected}) => getBorderColor(isSelected)};
    justify-content: center;
  `,
  idText: styled.Text`
    padding-left: 16px;
    color: black;
    font-weight: bold;
  `,
  buttonArea: styled.View`
    margin: 0 16px;
    background-color: white;
    height: 64px;
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    width: 100%;
  `,
  dummyBox: styled.View`
    height: 58px;
  `,
};
