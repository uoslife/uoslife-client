import styled from '@emotion/native';

import {colors} from '@uoslife/design-system';
import {ViewProps} from 'react-native';

type Props = {
  children: React.ReactNode;
} & ViewProps;

const CardLayout = ({children, ...props}: Props) => {
  return <S.CardLayoutWrapper {...props}>{children}</S.CardLayoutWrapper>;
};

export default CardLayout;

const S = {
  CardLayoutWrapper: styled.View`
    border-radius: 20px;
    border: 1px solid ${colors.grey40};
    background: ${colors.white};
  `,
};
