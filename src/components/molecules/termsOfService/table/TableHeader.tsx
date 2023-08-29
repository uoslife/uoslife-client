import styled from '@emotion/native'
import { Txt } from '@uoslife/design-system';
import React from 'react'

type TableHeaderProps={
    title: string,
    leftOpen?:boolean;
    topOpen?:boolean;
    leftandTopOpen?:boolean;
}

const TableHeader: React.FC<TableHeaderProps>  = ({title, leftOpen, topOpen, leftandTopOpen}) => {
  return (
    <HeaderContainer leftOpen={leftOpen} topOpen={topOpen} leftandTopOpen={leftandTopOpen}>
      <Txt label={title} color={'grey190'} typograph={'labelLarge'}/>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View<Pick<TableHeaderProps, 'leftOpen'|'topOpen'|'leftandTopOpen'>>`
border-top-width: ${(props) => (props.topOpen || props.leftandTopOpen ? '0' : '1px')};
border-top-color: #e1dfdd;
border-right-width: 1px;
border-right-color: #e1dfdd;
border-bottom-width: 1px;
border-bottom-color: #e1dfdd;
border-left-width: ${(props) => (props.leftOpen || props.leftandTopOpen ? '0' : '1px')};
border-left-color: #e1dfdd;
background-color: #f3f2f1;
width: 164px;
padding: 16px 12px;
align-items: flex-start;
`;

export default TableHeader;
