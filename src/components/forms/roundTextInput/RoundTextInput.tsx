import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import styled from '@emotion/native';

import RoundTextInputProps from './RoundTextInput.type';
import {colors, typographs} from '@uoslife/design-system';

const RoundTextInput = ({
  keyboardType = 'default',
  status = 'default',
  statusMessage,
  value,
  placeholder,
  placeholderTextColor = colors.grey60,
  onChangeText,
  children,
  ...props
}: RoundTextInputProps) => {
  return (
    <View>
      <Pressable>
        <S.roundInputContainer value={value} status={status}>
          <S.textInput
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            {...props}
          />
          {children}
          {value && (
            <Pressable onPress={onPress}>
              <S.deleteTextIcon
                source={require('../../../assets/images/deleteButton.png')}
              />
            </Pressable>
          )}
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
      return colors.primaryBrand;
    case 'error':
      return colors.red;
    default:
      return colors.grey130;
  }
};

const S = {
  roundInputContainer: styled.View<RoundTextInputProps>`
    position: relative;
    width: 100%;
    padding: 5px 12px 8px 12px;
    border-bottom-width: ${({value}) => (value! ? '2px' : '1px')};
    border-bottom-color: ${({status}) => getStatusColor(status!)};
  `,
  textInput: styled.TextInput<RoundTextInputProps>`
    ${() => typographs.titleSmall}
  `,
  statusMessageWrapper: styled.View<RoundTextInputProps>`
    padding-top: 7px;
    padding-left: 8px;
  `,
  statusMessage: styled.Text<RoundTextInputProps>`
    color: ${({status}) => getStatusColor(status!)};
    ${() => typographs.labelMedium}
  `,
  deleteTextIcon: styled.Image<RoundTextInputProps>`
    height: 24px;
    width: 24px;
  `,
};
