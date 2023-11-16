import styled from '@emotion/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import {useAtom, useSetAtom} from 'jotai';
import {Txt, Button, colors} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../../components/molecules/common/header/Header';
import {
  accountFlowStatusAtom,
  existedAccountInfoAtom,
} from '../../../atoms/account';

const AccountIntegrationScreen = () => {
  const insets = useSafeAreaInsets();
  const setAccountFlowStatus = useSetAtom(accountFlowStatusAtom);
  const [existedAccountInfo, setExistedAccountInfo] = useAtom(
    existedAccountInfoAtom,
  );

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
          <S.idContainer>
            {existedAccountInfo.map(item => (
              <Pressable
                key={item.id}
                onPress={() =>
                  setExistedAccountInfo(prev => {
                    return prev.map(prevItem =>
                      prevItem.id === item.id
                        ? {...prevItem, isSelected: true}
                        : {...prevItem, isSelected: false},
                    );
                  })
                }>
                <S.idButtonSelected isSelected={item.isSelected}>
                  <Txt
                    label={item.nickname}
                    color="grey190"
                    typograph="titleMedium"
                  />
                </S.idButtonSelected>
              </Pressable>
            ))}
          </S.idContainer>
        </View>
        <Button
          label="계정 통합하기"
          onPress={handlePressButton}
          isEnabled={existedAccountInfo.some(item => item.isSelected === true)}
          isFullWidth
        />
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
    flex: 1;
    justify-content: space-between;
    padding: 28px 16px 0;
  `,
  idContainer: styled.ScrollView`
    gap: 16px;
    padding-bottom: 16px;
  `,
  idButtonSelected: styled.View<{isSelected: boolean}>`
    display: flex;

    height: 56px;
    border-radius: 10px;
    padding: 16px;
    border: 2px solid ${({isSelected}) => getBorderColor(isSelected)};
    justify-content: center;
  `,
  idText: styled.Text`
    padding-left: 16px;
    color: black;
    font-weight: bold;
  `,
};
