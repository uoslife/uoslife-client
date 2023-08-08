import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import FirstPage from './AgreementTerms/FirstPage';
import SecondPage from './AgreementTerms/SecondPage';

const AgreementTermsScreen = () => {
  // 임시
  const [page, setPage] = useState<1 | 2>(2);

  const PageComponent = () => {
    switch (page) {
      case 1:
        return <FirstPage />
      case 2:
        return <SecondPage />
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header label='계정 통합' />
      <PageComponent />
    </View>
  );
};

export default AgreementTermsScreen;

const S = {
  pageWrapper: styled.View`
    padding-top: 42px;
    padding-right: 21px;
    padding-left: 21px;

  `
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
