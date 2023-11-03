import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import webview from '../../configs/webview';
import {useConfigContext} from '../../hooks/ConfigContext';
import Spinner from '../spinner/Spinner';

export type CustomWebviewProps = {
  navigation: StackNavigationProp<ParamListBase>;
  url: string;
};

const CustomWebView = ({url}: CustomWebviewProps) => {
  const {config} = useConfigContext();
  const webviewRef = useRef<WebView>();

  return (
    <WebView
      originWhitelist={['https://www.uoslife.team']} // In-App Webview를 위한 임시 링크 등록.
      // originWhitelist={config.get('webview.allowed_hosts') as string[]}
      // TODO: superbase에 등록된 webview.allowed_hosts에 웹뷰 링크 추가하기.
      source={{uri: url ?? (config.get('webview.url') as string)}}
      ref={ref => (webviewRef.current = ref || ({} as WebView))}
      injectedJavaScript={webview.injectedJavascript}
      allowsBackForwardNavigationGestures
      setBuiltInZoomControls={false}
      setDisplayZoomControls={false}
      javaScriptEnabled
      domStorageEnabled
      allowFileAccess
      scalesPageToFit
      cacheEnabled
      bounces={false}
      startInLoadingState
      renderLoading={() => <Spinner />}
    />
  );
};

export default CustomWebView;
