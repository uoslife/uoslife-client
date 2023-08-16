import styled from '@emotion/native';

import {colors} from '@uoslife/design-system';

const CardLayout = ({children}: {children: React.ReactNode}) => {
  return <S.CardLayoutWrapper>{children}</S.CardLayoutWrapper>;
};

export default CardLayout;

const S = {
  CardLayoutWrapper: styled.View`
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${colors.grey40};
    background: ${colors.white};
  `,
};
