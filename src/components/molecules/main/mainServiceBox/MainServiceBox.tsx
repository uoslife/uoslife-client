import React from 'react';
import styled from '@emotion/native';

import {Txt} from '@uoslife/design-system';
import {CardLayout} from '../..';

import MainServiceBoxType from './MainServiceBox.type';

const MainServiceBox = ({label, children}: MainServiceBoxType) => {
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <Txt label={label} color={'primaryDarker'} typograph={'titleMedium'} />
        <Txt label={'더보기'} color={'grey90'} typograph={'labelMedium'} />
      </S.TopWrapper>
      {children}
    </S.Wrapper>
  );
};
export default MainServiceBox;

const S = {
  Wrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  TopWrapper: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};
