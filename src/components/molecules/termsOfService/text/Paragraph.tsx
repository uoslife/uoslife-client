import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type ParagraphProps = {
  header?: string;
  subHeader?: string;
  paragraph?: string;
};

const Paragraph = ({header, subHeader, paragraph}: ParagraphProps) => {
  return (
    <View>
      <HeaderContainer>
        {header && (
          <Txt label={header} color={'grey190'} typograph={'titleLarge'} />
        )}
      </HeaderContainer>
      <View style={styles.subHedaer}>
        {subHeader && (
          <Txt label={subHeader} color={'grey190'} typograph={'titleSmall'} />
        )}
      </View>
      <View style={styles.paragraph}>
        {paragraph && (
          <Txt label={paragraph} color={'grey130'} typograph={'bodyLarge'} />
        )}
      </View>
    </View>
  );
};

const HeaderContainer = styled.View`
  width: 328px;
  padding: 16px 0px;
`;

const styles = StyleSheet.create({
  subHedaer: {
    marginBottom: 12,
    width: 328,
  },
  paragraph: {
    width: 328,
  },
});

export default Paragraph;
