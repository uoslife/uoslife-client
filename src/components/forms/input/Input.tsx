import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import styled from '@emotion/native';
import InputProps from './Input.type';
import {Icon, Timer, colors, typographs} from '@uoslife/design-system';

const Input = ({
  keyboardType = 'default',
  status = 'default',
  label,
  statusMessage,
  value,
  placeholder,
  placeholderTextColor = colors.grey60,
  showTimer,
  currentTime,
  onChangeText,
  onPress,
  children,
  ...props
}: InputProps) => {
  return (
    <S.Container>
      <S.Label status={status}>{label}</S.Label>
      <S.InputContainer status={status}>
        <S.TextInput
          style={Styles.paddingVertical}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          {...props}
        />
        <S.InputRightBox>
          {showTimer && <Timer currentTime={currentTime!} />}
          {!!value && (
            <Pressable onPress={onPress}>
              <Icon name={'clear'} width={24} height={24} />
            </Pressable>
          )}
        </S.InputRightBox>
      </S.InputContainer>
      {children}
      {!!statusMessage && (
        <S.StatusMessageWrapper>
          <S.StatusMessage status={status}>{statusMessage}</S.StatusMessage>
        </S.StatusMessageWrapper>
      )}
    </S.Container>
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
      return colors.grey190;
    default:
      return colors.grey190;
  }
};

const S = {
  Container: styled.View`
    position: relative;
    width: 100%;
    height: 94px;
  `,
  Label: styled.Text<InputProps>`
    padding-left: 12px;
    color: ${({status}) => getStatusColor(status)};
    ${typographs.labelLarge}
  `,
  InputContainer: styled.View<Pick<InputProps, 'status'>>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${({status}) => getStatusColor(status!)};
  `,
  TextInput: styled.TextInput`
    ${typographs.titleMedium};
  `,
  InputRightBox: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  `,
  StatusMessageWrapper: styled.View`
    position: absolute;
    left: 12px;
    bottom: 8px;
  `,
  StatusMessage: styled.Text<Pick<InputProps, 'status'>>`
    color: ${({status}) => getStatusColor(status!)};
    ${typographs.labelMedium}
  `,
};

const Styles = StyleSheet.create({
  // android input hidden padding prevent.
  paddingVertical: {
    paddingVertical: 0,
  },
});
