import React from 'react';
import styled from '@emotion/native';

import {Icon, Txt} from '@uoslife/design-system';
import {CardLayout} from '../..';

import MainServiceBoxType from './MainServiceBox.type';

const MainServiceBox = ({label, icon, children}: MainServiceBoxType) => {
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <S.TitleWrapper>
          <Icon name={icon} width={15} height={16} />
          <Txt
            label={label}
            color={'primaryDarker'}
            typograph={'titleMedium'}
          />
        </S.TitleWrapper>
        <S.MoreButton>
          <Txt label={'더보기'} color={'grey90'} typograph={'labelMedium'} />
          <Icon name={'forwardArrow_grey90'} width={10} height={10} />
        </S.MoreButton>
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
    padding: 0 12px;
  `,
  TitleWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  MoreButton: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
};
