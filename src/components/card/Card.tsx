import React from 'react';
import {Text} from 'react-native';

import styled, {css} from '@emotion/native';

import CardProps from './Card.type';

const Test = ({title, time}: CardProps) => {
  return (
    <S.cardContainer>
      <S.cardWrapper>
        <Text
          style={css`
            font-weight: bold;
          `}>
          {title}
        </Text>
        <S.button>{time}</S.button>
      </S.cardWrapper>
      <S.cardWrapper>
        <Text>돈불고기</Text>
        <Text>3000원</Text>
      </S.cardWrapper>
      <S.cardWrapper>
        <Text>돈불고기</Text>
        <Text>3000원</Text>
      </S.cardWrapper>
      <S.cardWrapper>
        <Text>돈불고기</Text>
        <Text>3000원</Text>
      </S.cardWrapper>
    </S.cardContainer>
  );
};

export default Test;

const S = {
  cardContainer: styled.View`
    padding: 12px;
    width: 200px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #efefef;
  `,
  cardWrapper: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  button: styled.View`
    border-radius: 16px;
    background: #d0d0d0;
    padding: 4px 10px;
    font-size: 10px;
  `,
};
