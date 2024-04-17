import styled from '@emotion/native';
import {PropsWithChildren} from 'react';
import {Txt, colors} from '@uoslife/design-system';
import boxShadowStyle from '../../../../../styles/boxShadow';

const LibraryRankingServiceBox = ({
  children,
  label,
}: PropsWithChildren & {label: string}) => {
  return (
    <S.Container style={{...boxShadowStyle.bottomTapShadow}}>
      <Txt label={label} color="grey190" typograph="titleLarge" />
      {children}
    </S.Container>
  );
};

export default LibraryRankingServiceBox;

const S = {
  Container: styled.View`
    margin: 16px 0;
    padding: 18px;
    border-radius: 20px;
    gap: 16px;
    width: 100%;
    background-color: ${colors.white};
  `,
};
