import React, {useRef} from 'react';
import {useConfigContext} from '../hooks/ConfigContext';
import WebView from 'react-native-webview';
import webview from '../configs/webview';
import {StackScreenProps} from '@react-navigation/stack';

type Props<ParamList extends Record<string, object | undefined>> =
  StackScreenProps<ParamList>;

const WebViewScreen: React.FC<Props<any>> = ({route}) => {
  const {config} = useConfigContext();
  const webviewRef = useRef<WebView>();
  const url = route.params?.url;

  return (
    <WebView
      originWhitelist={['https://www.google.com', 'https://m.naver.com']} // In-App Webview를 위한 임시 링크 등록.
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
    />
  );
};

export default WebViewScreen;
