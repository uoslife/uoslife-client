import React from 'react';
import {Pressable, TextInput} from 'react-native';

import styled from '@emotion/native';

import RoundInputProps from './RoundInput.type';
import roundInputType from './RoundInput.type';

const RoundInput = ({
  keyboardType = 'default',
  status = 'default',
  value,
  placeholder,
  children,
  onChangeText,
  ...props
}: RoundInputProps) => {
  return (
    <Pressable>
      <S.roundInputContainer status={status}>
        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {children}
      </S.roundInputContainer>
    </Pressable>
  );
};

export default RoundInput;

const getBorderColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'blue';
    case 'error':
      return 'red';
    default:
      return 'black';
  }
};

const S = {
  roundInputContainer: styled.View<roundInputType>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 62px;
    border-radius: 15px;
    border: 1px solid ${({status}) => getBorderColor(status!)};
    padding: 19px;
  `,
};
