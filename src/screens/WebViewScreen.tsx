import React, {useRef} from 'react';
import {useConfigContext} from '../hooks/ConfigContext';
import WebView from 'react-native-webview';
import webview from '../configs/webview';

type Props = {
  url?: string;
};

const WebViewScreen: React.FC<Props> = ({url}) => {
  const {config} = useConfigContext();
  const webviewRef = useRef<WebView>();

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
