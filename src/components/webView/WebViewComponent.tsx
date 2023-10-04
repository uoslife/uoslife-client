import React, {useRef, useState} from 'react';
import {useConfigContext} from '../../hooks/ConfigContext';
import WebView from 'react-native-webview';
import webview from '../../configs/webview';
import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native/dist/emotion-native.cjs';
import Header from '../../components/header/Header';
import Spinner from '../../components/spinner/Spinner';

type WebviewProps<NavigationStackParamList extends ParamListBase> =
  StackScreenProps<NavigationStackParamList> & {label?: string};

const WebViewComponent = ({navigation, route, label}: WebviewProps<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const {config} = useConfigContext();
  const webviewRef = useRef<WebView>();
  const insets = useSafeAreaInsets();
  const url = route.params?.url;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      {label && <Header label={label} onPressBackButton={handleGoBack} />}
      <WebView
        originWhitelist={['https://www.google.com', 'https://m.blog.naver.com']} // In-App Webview를 위한 임시 링크 등록.
        // originWhitelist={config.get('webview.allowed_hosts') as string[]}
        // TODO: superbase에 등록된 webview.allowed_hosts에 웹뷰 링크 추가하기.
        source={{uri: url ?? (config.get('webview.url') as string)}}
        ref={ref => (webviewRef.current = ref || ({} as WebView))}
        injectedJavaScript={webview.injectedJavascript}
        allowsBackForwardNavigationGestures={true}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        scalesPageToFit={true}
        cacheEnabled={true}
        bounces={false}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && <Spinner />}
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
};

export default WebViewComponent;
