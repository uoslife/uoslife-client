import React from 'react';
import {Pressable, TextInput} from 'react-native';

import styled from '@emotion/native';

import RoundTextInputProps from './RoundTextInput.type';

const RoundTextInput = ({
  keyboardType = 'default',
  status = 'default',
  value,
  placeholder,
  placeholderTextColor = 'grey',
  children,
  onChangeText,
  ...props
}: RoundTextInputProps) => {
  return (
    <Pressable>
      <S.roundInputContainer status={status}>
        <S.textInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          {...props}
        />
        {children}
      </S.roundInputContainer>
    </Pressable>
  );
};

export default RoundTextInput;

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
  roundInputContainer: styled.View<RoundTextInputProps>`
    position: relative;
    width: 100%;
    height: 62px;
    border: 1px solid ${({status}) => getBorderColor(status!)};
    border-radius: 15px;
  `,
  textInput: styled.TextInput<RoundTextInputProps>`
    padding: 19px;
    height: 100%;
    width: 100%;
  `,
};
