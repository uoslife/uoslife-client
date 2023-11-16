import styled from '@emotion/native';
import React from 'react';
import {Txt, colors} from '@uoslife/design-system';
import CardProps from './Card.type';
import CardLayout from '../cardLayout/CardLayout';

const Card = ({title, caption, children}: CardProps) => {
  return (
    <CardLayout>
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
    </CardLayout>
  );
};

const S = {
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
