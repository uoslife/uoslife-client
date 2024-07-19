import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '@uoslife/design-system';
import styled from '@emotion/native';

const LoadingIndicator = () => {
  return (
    <S.ActivityIndicatorContainer>
      <ActivityIndicator size="large" color={colors.primaryBrand} />
    </S.ActivityIndicatorContainer>
  );
};

export default LoadingIndicator;

const S = {
  ActivityIndicatorContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
};
