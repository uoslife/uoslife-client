import styled from '@emotion/native';
import Header from '../../../components/header/Header';
import React, {ReactNode} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import MainTitle from '../../../components/molecules/termsOfService/text/MainTitle';
import {View} from 'react-native';
import Paragraph from '../../../components/molecules/termsOfService/text/Paragraph';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type advertisingandMarketingItem = {
  header?: string;
  subHeader?: string;
  paragraph?: string;
  table?: ReactNode;
};

const AdvertisingandMarketingConsentScreen = () => {
  const insets = useSafeAreaInsets();
  const advertisingandMarketingItems: advertisingandMarketingItem[] = [
    {
      paragraph: `단체 UOSLIFE(이하 “단체”)는 개인정보 보호법 제 22조 제 4항과 제 39조의 3에 따라 사용자의 광고성 정보 수신과 이에 따른 개인정보 처리에 대한 동의를 받고 있습니다. 약관에 동의하지 않으셔도 단체 UOSLIFE의 모든 서비스를 이용할실 수 있습니다. 다만, 이벤트, 혜택 등의 제한이 있을 수 있습니다.`,
    },
    {
      paragraph: `· 개인정보 수집 항목
    · 학과, 입학년도, 신분(ex. 학사, 석사)

· 개인정보 수집 이용 목적
    · 이벤트 운영 및 광고성 정보 전송
    · 서비스 관련 정보 전송

· 보유 및 이용 기간
    · 회원 탈퇴 시까지

· 전송방법
    · 서비스 알림

· 전송 내용
    · 혜택 정보, 이벤트 정보, 신규 서비스 안내 등의 광고성 정보 제공`,
    },
  ];

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label={'광고 및 마케팅 수신 동의'} />
      <ScrollView>
        <S.contentsWrapper>
          <MainTitle mainTitle="광고 및 마케팅 수신 동의 약관" />
          <View style={{gap: 40}}>
            {advertisingandMarketingItems.map((item, index) => (
              <View key={index}>
                {(item.header || item.subHeader || item.paragraph) && (
                  <Paragraph
                    header={item.header}
                    subHeader={item.subHeader}
                    paragraph={item.paragraph}
                  />
                )}
                {item.table && item.table}
              </View>
            ))}
          </View>
        </S.contentsWrapper>
      </ScrollView>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
    background-color: #ffffff;
  `,
  contentsWrapper: styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px 16px 0px 16px;
    margin-bottom: 61px;
  `,
};

export default AdvertisingandMarketingConsentScreen;
