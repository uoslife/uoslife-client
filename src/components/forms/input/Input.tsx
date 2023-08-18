import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import styled from '@emotion/native';
import InputProps from './Input.type';
import {colors, typographs} from '@uoslife/design-system';

const Input = ({
  keyboardType = 'default',
  status = 'default',
  label,
  statusMessage,
  value,
  placeholder,
  placeholderTextColor = colors.grey60,
  onChangeText,
  onPress,
  children,
  ...props
}: InputProps) => {
  return (
    <View>
      <S.label status={status}>{label}</S.label>
      <Pressable>
        <S.roundInputContainer value={value} status={status}>
          <S.textInput
            style={Styles.paddingVertical}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            {...props}
          />
          {children}
          {!!value && (
            <Pressable onPress={onPress}>
              <S.deleteTextIcon
                source={require('../../../assets/images/deleteButton.png')}
              />
            </Pressable>
          )}
        </S.roundInputContainer>
      </Pressable>
      {!!statusMessage && (
        <S.statusMessageWrapper>
          <S.statusMessage status={status}>{statusMessage}</S.statusMessage>
        </S.statusMessageWrapper>
      )}
    </View>
  );
};

export default Input;

const getStatusColor = (status: InputProps['status']) => {
  switch (status) {
    case 'success':
      return colors.primaryBrand;
    case 'error':
      return colors.red;
    case 'default':
      return colors.grey130;
    default:
      return colors.grey130;
  }
};

const S = {
  label: styled.Text<InputProps>`
    padding-left: 12px;
    color: ${({status}) => getStatusColor(status)};
    ${() => typographs.bodyMedium}
  `,
  roundInputContainer: styled.View<InputProps>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 12px 8px 12px;
    border-bottom-width: ${({value}) => (!!value ? '2px' : '1px')};
    border-bottom-color: ${({status}) => getStatusColor(status!)};
  `,
  textInput: styled.TextInput<InputProps>`
    ${() => typographs.titleSmall}
  `,
  statusMessageWrapper: styled.View<InputProps>`
    padding-top: 7px;
    padding-left: 8px;
  `,
  statusMessage: styled.Text<InputProps>`
    color: ${({status}) => getStatusColor(status!)};
    ${() => typographs.labelMedium}
  `,
  deleteTextIcon: styled.Image<InputProps>`
    height: 24px;
    width: 24px;
  `,
};

const Styles = StyleSheet.create({
  // android input hidden padding prevent.
  paddingVertical: {
    paddingVertical: 0,
  },
});
