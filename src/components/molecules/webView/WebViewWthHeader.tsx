import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import Header from '../common/header/Header';
import CustomWebView, {CustomWebviewProps} from './CustomWebView';

type WebviewWithHeaderProps = CustomWebviewProps & {label: string};

const WebViewWithHeader = ({
  navigation,
  label,
  url,
}: WebviewWithHeaderProps) => {
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label={label} onPressBackButton={handleGoBack} />
      <CustomWebView navigation={navigation} url={url} />
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
};

export default WebViewWithHeader;
