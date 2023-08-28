import styled from '@emotion/native';
import Header from '../../../components/header/Header';
import React from 'react'

const ToSandPoliciesScreen = () => {
  return (
    <S.screenContainer>
        <Header label={'이용 약관 및 정책'} />
    </S.screenContainer>
  )
}

const S = {
    screenContainer: styled.View`
      flex: 1;
      background-color: #ffffff;
    `,
  };

export default ToSandPoliciesScreen;