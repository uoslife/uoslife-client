import styled from '@emotion/native';
import Header from '../../../components/header/Header';
import React from 'react'

const PrivacyPoliciesScreen = () => {
  return (
    <S.screenContainer>
        <Header label={'개인정보 처리방침'} />
    </S.screenContainer>
  )
}

const S = {
    screenContainer: styled.View`
      flex: 1;
      background-color: #ffffff;
    `,
  };

export default PrivacyPoliciesScreen;