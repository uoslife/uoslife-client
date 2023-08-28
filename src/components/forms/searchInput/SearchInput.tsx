import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import styled from '@emotion/native';
import SearchInputProps from './SearchInput.type';
import {colors, Icon, typographs} from '@uoslife/design-system';

const SearchInput = ({
  status = 'default',
  value,
  placeholder,
  placeholderTextColor = colors.grey60,
  onChangeText,
  onPress,
  onSubmitEditing,
  children,
  ...props
}: SearchInputProps) => {
  return (
    <View>
      <Pressable>
        <S.roundInputContainer value={value} status={status}>
          <S.searchIcon
            source={
              !!value
                ? require('../../../assets/images/search/search_grey190.png')
                : require('../../../assets/images/search/search_grey60.png')
            }
          />

          <S.textInput
            style={Styles.paddingVertical}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline={false}
            returnKeyType={'search'}
            {...props}
          />
          {children}
          {!!value && (
            <S.deleteTextWrapper>
              <Pressable onPress={onPress}>
                <Icon name={'clear'} width={24} height={24} color={'grey90'} />
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
  roundInputContainer: styled.View<SearchInputProps>`
    position: relative;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 8px 16px 10px 16px;
    gap: 8px;
    border-width: ${({value}) => (!!value ? '2px' : '1px')};
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
