import styled from '@emotion/native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {View} from 'react-native';
import {Button} from '../../../components/button/Button';
import {accountStatusAtom} from '..';
import {useSetAtom} from 'jotai';

const DUMMY_ID_LIST = [
  'dbmean',
  'minminmin',
  '헬로우헬로45s우',
  'ㅁㄴㅇ라ㅓㄴㅁ와러ㅗㄴㅇㄹ',
];

const AccountIntegrationScreen = () => {
  const [selected, setSelected] = useState<string>();
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
    <S.pageWrapper>
      <S.contentsContainer>
        <S.descriptionsContainer>
          <View>
            <S.description1>통합하고자 하는 아이디를</S.description1>
            <S.description1>선택해주세요.</S.description1>
          </View>
          <View>
            {/* <S.description2>&#8226; 아래 기본 계정 중 대표로 통합할 계정을 선택해주세요.</S.description2> */}
            {/* <S.description2>&#8226; 선택한 계정을 제외한 기존 계정은 삭제됩니다.</S.description2> */}
            <S.description2>
              선택한 계정을 제외한 기존 계정은 삭제됩니다.
            </S.description2>
          </View>
        </S.descriptionsContainer>
        <S.idContainer>
          {idList.map(id =>
            id === selected ? (
              <S.idButtonSelected
                key={id}
                onPress={() => {
                  setSelected(id);
                }}>
                <S.idText>{id}</S.idText>
              </S.idButtonSelected>
            ) : (
              <S.idButtonDefault
                key={id}
                onPress={() => {
                  setSelected(id);
                }}>
                <S.idText>{id}</S.idText>
              </S.idButtonDefault>
            ),
          )}
        </S.idContainer>
      </S.contentsContainer>
      <Button
        label={'계정 통합하기'}
        type={selected ? 'primary' : 'default'}
        onPress={handlePressButton}
      />
    </S.pageWrapper>
  );
};

export default AccountIntegrationScreen;

const S = {
  pageWrapper: styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 28px;
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 28px;

    justify-content: space-between;
  `,
  contentsContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 32px;
  `,
  description1: styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
  `,
  description2: styled.Text`
    font-size: 18px;
    color: black;
  `,
  descriptionsContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  idContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 28px;
  `,
  idButtonDefault: styled.TouchableOpacity`
    display: flex;

    height: 56px;
    border-radius: 10px;
    border: #e1dfdd;

    justify-content: center;
  `,
  idButtonSelected: styled.TouchableOpacity`
    display: flex;

    height: 56px;
    border-radius: 10px;
    border-width: 2px;
    border: #4686ff;

    justify-content: center;
  `,
  idText: styled.Text`
    padding-left: 16px;
    color: black;
    font-weight: bold;
  `,
  // cardContainer: styled.View`
  //   padding: 12px;
  //   width: 200px;
  //   display: flex;
  //   flex-direction: column;
  //   border-radius: 8px;
  //   background: #efefef;
  // `,
  // cardWrapper: styled.View`
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  // `,
  // button: styled.View`
  //   border-radius: 16px;
  //   background: #d0d0d0;
  //   padding: 4px 10px;
  //   font-size: 10px;
  // `,
};
