import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import React from 'react';
import {View} from 'react-native';

type ParagraphProps = {
  header?: string;
  subHeader?: string;
  paragraph?: string;
};

const Paragraph = ({header, subHeader, paragraph}: ParagraphProps) => {
  return (
    <View>
      <S.headerContainer>
        {header && (
          <Txt label={header} color={'grey190'} typograph={'titleLarge'} />
        )}
      </S.headerContainer>
      <S.subHeaderContainer>
        {subHeader && (
          <Txt label={subHeader} color={'grey190'} typograph={'titleSmall'} />
        )}
      </S.subHeaderContainer>
      <View>
        {paragraph && (
          <Txt label={paragraph} color={'grey130'} typograph={'bodyLarge'} />
        )}
      </View>
    </View>
  );
};

const S = {
  headerContainer: styled.View`
    padding: 16px 0px;
  `,
  subHeaderContainer: styled.View`
    padding: 0px 0px 12px 0px,
  `
};

export default Paragraph;