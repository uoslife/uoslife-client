import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import React from 'react';
import { View } from 'react-native';

type TableBodyProps = {
  subTitle?: string;
  bodyText?: string;
  leftOpen?: boolean;
  topOpen?: boolean;
  leftandTopOpen?: boolean;
};

const TableBody: React.FC<TableBodyProps> = ({subTitle, bodyText, leftOpen, topOpen, leftandTopOpen}) => {
  return (
    <BodyContainer
      leftOpen={leftOpen}
      topOpen={topOpen}
      leftandTopOpen={leftandTopOpen}>
      <View style={{gap:8}}>
        {subTitle&&<Txt label={subTitle} color={'grey160'} typograph={'labelLarge'} />}
        {bodyText&&<Txt label={bodyText} color={'grey130'} typograph={'bodyMedium'} />}
      </View>
    </BodyContainer>
  );
};

const BodyContainer = styled.View<
  Pick<TableBodyProps, 'leftOpen' | 'topOpen' | 'leftandTopOpen'>
>`
  border-top-width: ${props =>
    props.topOpen || props.leftandTopOpen ? '0' : '1px'};
  border-top-color: #e1dfdd;
  border-right-width: 1px;
  border-right-color: #e1dfdd;
  border-bottom-width: 1px;
  border-bottom-color: #e1dfdd;
  border-left-width: ${props =>
    props.leftOpen || props.leftandTopOpen ? '0' : '1px'};
  border-left-color: #e1dfdd;
  background-color: #FFFFFF;
  width:100%;
  padding: 16px 12px;
  flex-direction: column;
  align-items: flex-start;
`;

export default TableBody;
