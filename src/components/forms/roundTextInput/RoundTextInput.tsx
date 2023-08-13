import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import styled from '@emotion/native';

import RoundTextInputProps from './RoundTextInput.type';

const RoundTextInput = ({
  keyboardType = 'default',
  status = 'default',
  statusMessage,
  value,
  placeholder,
  placeholderTextColor = 'grey',
  onChangeText,
  children,
  ...props
}: RoundTextInputProps) => {
  return (
    <View>
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
      {status && (
        <S.statusMessageWrapper>
          <S.statusMessage status={status}>{statusMessage}</S.statusMessage>
        </S.statusMessageWrapper>
      )}
    </View>
  );
};

export default RoundTextInput;

const getStatusColor = (status: string) => {
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
    border: 1px solid ${({status}) => getStatusColor(status!)};
    border-radius: 15px;
  `,
  textInput: styled.TextInput<RoundTextInputProps>`
    padding: 19px;
    height: 100%;
    width: 100%;
  `,
  statusMessageWrapper: styled.View<RoundTextInputProps>`
    padding-top: 7px;
    padding-left: 8px;
  `,
  statusMessage: styled.Text<RoundTextInputProps>`
    color: ${({status}) => getStatusColor(status!)};
  `,
};
