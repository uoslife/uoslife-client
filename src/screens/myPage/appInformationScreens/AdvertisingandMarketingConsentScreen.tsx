import styled from '@emotion/native';
import Header from '../../../components/header/Header';
import React from 'react'

const AdvertisingandMarketingConsentScreen = () => {
  return (
    <S.screenContainer>
        <Header label={'광고 및 마케팅 수신 동의'} />
    </S.screenContainer>
  )
}

const S = {
    screenContainer: styled.View`
      flex: 1;
      background-color: #ffffff;
    `,
  };

export default AdvertisingandMarketingConsentScreen;