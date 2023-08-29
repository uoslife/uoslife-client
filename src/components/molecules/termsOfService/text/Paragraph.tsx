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
      <S.paragraphWrapper>
        {paragraph && (
          <Txt label={paragraph} color={'grey130'} typograph={'bodyLarge'} />
        )}
      </S.paragraphWrapper>
    </View>
  );
};

const S = {
  headerContainer: styled.View`
    width: 100%;
    padding: 16px 0px;
  `,
  subHeaderContainer: styled.View`
    margin-bottom: 12,
    width: 100%,
 `,
  paragraphWrapper: styled.View`
    width: 100%;
  `,
};

export default Paragraph;
