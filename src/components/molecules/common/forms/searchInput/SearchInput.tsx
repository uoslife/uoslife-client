import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import styled from '@emotion/native';
import {colors, Icon, typographs} from '@uoslife/design-system';
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
        <S.roundInputContainer value={value} status={status}>
          <Icon
            name="search"
            width={24}
            height={24}
            color={value ? 'grey190' : 'grey60'}
          />
          <S.textInput
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
          {!!value && (
            <S.deleteTextWrapper>
              <Pressable onPress={onPressClear}>
                <Icon name="clear" width={24} height={24} color="grey90" />
              </Pressable>
            </S.deleteTextWrapper>
          )}
        </S.roundInputContainer>
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
  roundInputContainer: styled.Pressable<SearchInputProps>`
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
  textInput: styled.TextInput<SearchInputProps>`
    ${() => typographs.bodyLarge};
    line-height: 20px;
    width: 80%;
  `,
  deleteTextWrapper: styled.View<SearchInputProps>`
    position: absolute;
    left: 97%;
  `,
  searchIcon: styled.Image<SearchInputProps>`
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
