import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import CafeteriaCard from '../../components/cards/CafeteriaCard';

export type cafeteriaItem = {
  corner?: string;
  dish?: string;
  subDish?: string;
  price?: string;
  extraPrice?: string;
  showDivider?: boolean;
};

const CafeteriaScreen = () => {
  const cafeteriaItems: cafeteriaItem[] = [
    {
      corner: '코너A',
      dish: '라면',
      subDish: '치즈 / 떡 / 만두 / 공기밥',
      price: '2,000원',
      extraPrice: '(+ 500원)',
      showDivider: false,
    },
    {dish: '삶은 계란', price: '500원', showDivider: false},
    {dish: '돈불고기', price: '3,000원', showDivider: true},
    {
      corner: '코너B',
      dish: '콩나물국',
      subDish: '쥐어채볶음 / 참나물겉절이 / 만두',
      price: '3,800원',
      showDivider: true,
    },
    {
      corner: '코너C',
      dish: '콩나물국',
      subDish: '쥐어채볶음 / 참나물겉절이 / 만두',
      price: '3,800원',
      showDivider: true,
    },
    {
      corner: '코너D',
      dish: '콩나물국',
      subDish: '쥐어채볶음 / 참나물겉절이 / 만두',
      price: '3,800원',
      showDivider: false,
    },
  ];

  return (
    <S.screenContainer>
      <Header label={'학식'} />
      <ScrollView>
        <S.menuContainer>
          <CafeteriaCard
            cafeteriaItems={cafeteriaItems}
            place="학생회관"
            time="17:00 ~ 18:30"
          />
          <CafeteriaCard
            isEmpty={true}
            place="자연과학관"
            time="17:00 ~ 18:30"
          />
        </S.menuContainer>
      </ScrollView>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
    background-color: #ffffff;
  `,
  menuContainer: styled.View`
    align-dishs: center;
    justify-content: center;
    margin: 24px 16px;
    gap: 16px;
  `,
};

export default CafeteriaScreen;
