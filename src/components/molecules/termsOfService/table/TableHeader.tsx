import styled from '@emotion/native'
import { Txt } from '@uoslife/design-system';
import React from 'react'

type TableHeaderProps={
    title?: string,
    leftOpen?:boolean;
    topOpen?:boolean;
    leftandTopOpen?:boolean;
}

const TableHeader: React.FC<TableHeaderProps>  = ({title, leftOpen, topOpen, leftandTopOpen}) => {
  return (
    <HeaderContainer leftOpen={leftOpen} topOpen={topOpen} leftandTopOpen={leftandTopOpen}>
      {title&&<Txt label={title} color={'grey190'} typograph={'labelLarge'}/>}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View<Pick<TableHeaderProps, 'leftOpen'|'topOpen'|'leftandTopOpen'>>`
flex:1;
border-top-width: ${(props) => (props.topOpen || props.leftandTopOpen ? '0px' : '1px')};
border-top-color: #e1dfdd;
border-right-width: 1px;
border-right-color: #e1dfdd;
border-bottom-width: 1px;
border-bottom-color: #e1dfdd;
border-left-width: ${(props) => (props.leftOpen || props.leftandTopOpen ? '0px' : '1px')};
border-left-color: #e1dfdd;
background-color: #f3f2f1;
width: 164px;
padding: 16px 12px 16px 12px;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
`;

export default TableHeader;
