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

  // TODO: 뒤로가기 버튼 추가.

  return (
    <WebView
      originWhitelist={config.get('webview.allowed_hosts') as string[]}
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
