import styled from '@emotion/native';
import React from 'react';
import {Txt, colors} from '@uoslife/design-system';
import CardProps from './Card.type';

const Card = ({title, caption, children}: CardProps) => {
  return (
    <S.cardContainer>
      <S.cardHeader>
        <S.inlineWrapper>
          <Txt label={title} color="grey160" typograph="titleMedium" />
          {caption && (
            <Txt
              style={{textAlign: 'right'}}
              label={caption}
              color="grey150"
              typograph="caption"
            />
          )}
        </S.inlineWrapper>
      </S.cardHeader>
      <S.cardBody>{children}</S.cardBody>
    </S.cardContainer>
  );
};

const S = {
  cardContainer: styled.View`
    width: 100%;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${colors.grey40};
    background-color: #ffffff;
    overflow: hidden;
  `,
  cardHeader: styled.View`
    background-color: ${colors.grey10};
    padding: 20px 16px 12px;
  `,
  cardBody: styled.View`
    margin-top: 16px;
    margin-bottom: 8px;
  `,
  inlineWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
};

export default Card;
