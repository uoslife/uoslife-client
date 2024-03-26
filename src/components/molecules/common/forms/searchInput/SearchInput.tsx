import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import styled from '@emotion/native';
import {colors, Icon} from '@uoslife/design-system';
import SearchInputProps from './SearchInput.type';

const SearchInput = ({
  status = 'default',
  value,
  placeholder,
  placeholderTextColor = colors.grey60,
  onFocus,
  onChangeText,
  onPressClear,
  onSubmitEditing,
  inputRef,
  children,
  ...props
}: SearchInputProps) => {
  return (
    <View>
      <Pressable>
        <S.RoundInputContainer value={value} status={status}>
          <Icon
            name="search"
            width={24}
            height={24}
            color={value ? 'grey190' : 'grey60'}
          />
          <S.TextInput
            style={Styles.paddingVertical}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            onFocus={onFocus}
            ref={inputRef}
            placeholderTextColor={placeholderTextColor}
            multiline={false}
            returnKeyType="search"
            autoCapitalize="none"
            {...props}
          />
          {children}
          <S.DeleteIconContainer>
            {!!value && (
              <Pressable onPress={onPressClear}>
                <Icon name="clear" width={24} height={24} color="grey90" />
              </Pressable>
            )}
          </S.DeleteIconContainer>
        </S.RoundInputContainer>
      </Pressable>
    </View>
  );
};

export default SearchInput;

const getStatusColor = (status: SearchInputProps['status']) => {
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
  RoundInputContainer: styled.Pressable<SearchInputProps>`
    position: relative;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 8px 16px 10px 16px;
    gap: 8px;
    border-width: 1px;
    border-color: ${({status}) => getStatusColor(status!)};
    border-radius: 100px;
  `,
  TextInput: styled.TextInput<SearchInputProps>`
    line-height: 20px;
    width: 75%;
  `,
  DeleteIconContainer: styled.View<SearchInputProps>`
    position: absolute;
    right: 20px;
  `,
  SearchIcon: styled.Image<SearchInputProps>`
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
