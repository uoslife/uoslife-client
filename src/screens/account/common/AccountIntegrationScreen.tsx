import styled from '@emotion/native';
import React, {useState} from 'react';
import {Pressable, ScrollView, View, Dimensions} from 'react-native';
import {useAtom, useSetAtom} from 'jotai';
import {Txt, Button, colors} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../../components/molecules/common/header/Header';

import {
  accountFlowStatusAtom,
  existedAccountInfoAtom,
  ExistedAccountInfoType,
} from '../../../atoms/account';

const MOCK_DATA = [
  {
    id: '1234-1234',
    nickname: 'dff',
    username: 'example',
    isSelected: false,
  },
  {
    id: '1234-12343',
    nickname: 'null',
    username: 'example',
    isSelected: false,
  },
];

const DEVICE_HEIGHT = Dimensions.get('window').height;
const HEADER_TO_TXT_HEIGHT = 270; // 헤더부터 설명 문구('선택한 ~ 삭제됩니다')까지의 높이

const AccountIntegrationScreen = () => {
  const insets = useSafeAreaInsets();
  const setAccountFlowStatus = useSetAtom(accountFlowStatusAtom);
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

  const handlePressButton = () => {
    setAccountFlowStatus(prev => {
      return {
        ...prev,
        stepStatus: {userType: prev.stepStatus.userType, step: 1},
      };
    });
  };

  return (
    <S.screenContainer
      style={{paddingTop: insets.top, paddingBottom: insets.bottom + 8}}>
      <Header
        label="계정 통합"
        onPressBackButton={() =>
          setAccountFlowStatus(prev => {
            return {
              ...prev,
              stepStatus: {
                userType: 'NONE',
                step: 0,
              },
            };
          })
        }
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
          <S.idContainer style={{height: DEVICE_HEIGHT - HEADER_TO_TXT_HEIGHT}}>
            {existedAccountInfo.map(item => (
              <Pressable
                key={item.id}
                onPress={() => selectExistedAccount(item)}>
                {item.nickname && (
                  <S.idButtonSelected isSelected={item.isSelected}>
                    <Txt
                      label={item.nickname}
                      color="grey190"
                      typograph="titleMedium"
                    />
                  </S.idButtonSelected>
                )}
              </Pressable>
            ))}
            <S.dummyBox />
          </S.idContainer>
        </View>
        <S.buttonArea>
          <Button
            label="계정 통합하기"
            onPress={handlePressButton}
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

const getBorderColor = (isSelected: boolean) => {
  switch (isSelected) {
    case true:
      return colors.primaryBrand;
    case false:
      return colors.grey40;
  }
};

export default AccountIntegrationScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  accountIntegrationContainer: styled.View`
    padding: 28px 16px 0;
  `,
  idContainer: styled.ScrollView`
    padding-bottom: 16px;
  `,
  idButtonSelected: styled.View<{isSelected: boolean}>`
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
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  `,
  dummyBox: styled.View`
    height: 58px;
  `,
};
