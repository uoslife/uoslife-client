import React from 'react';
import {TextInput} from 'react-native';

import styled from '@emotion/native';

import RoundInputProps from './RoundInput.type';

const RoundInput = ({placeholder}: RoundInputProps) => {
  return (
    <S.roundInputContainer>
      <TextInput placeholder={placeholder} />
    </S.roundInputContainer>
  );
};

export default RoundInput;

const S = {
  roundInputContainer: styled.View``,
};
