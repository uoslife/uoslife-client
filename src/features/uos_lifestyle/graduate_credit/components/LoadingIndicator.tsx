import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from '@uoslife/design-system';

const LoadingIndicator = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.primaryBrand} />
    </View>
  );
};

export default LoadingIndicator;
