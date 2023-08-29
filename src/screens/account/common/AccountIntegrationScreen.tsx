import styled from '@emotion/native';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {accountStatusAtom} from '..';
import {useSetAtom} from 'jotai';
import Header from '../../../components/header/Header';
import {Txt, Button, colors} from '@uoslife/design-system';

const DUMMY_ID_LIST = ['아이디1', '아이디2', '아이디3', '아이디4'];

const AccountIntegrationScreen = () => {
  const [selectedId, setSelectedId] = useState<string>('아이디1');
  const [idList, setIdList] = useState<string[]>(DUMMY_ID_LIST);
  const setAccountStatus = useSetAtom(accountStatusAtom);

  const handlePressButton = () => {
    setAccountStatus(prev => {
      return {
        ...prev,
        stepStatus: {userType: prev.stepStatus.userType, step: 1},
      };
    });
  };

  return (
    <S.screenContainer>
      <Header
        label={'계정 통합'}
        onPressBackButton={() =>
          setAccountStatus(prev => {
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
              color={'grey190'}
              typograph={'headlineMedium'}
            />
            <Txt
              label={'선택한 계정을 제외한 기존 계정은 삭제됩니다.'}
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </View>
          <S.idContainer>
            {idList.map(id => (
              <Pressable key={id} onPress={() => setSelectedId(id)}>
                <S.idButtonSelected isSelected={id === selectedId}>
                  <Txt label={id} color={'grey190'} typograph={'titleMedium'} />
                </S.idButtonSelected>
              </Pressable>
            ))}
          </S.idContainer>
        </View>
        <Button
          label={'계정 통합하기'}
          onPress={handlePressButton}
          isEnabled={!!selectedId}
          isFullWidth={true}
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
    padding: 42px 16px;
  `,
  idContainer: styled.View`
    gap: 16px;
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
