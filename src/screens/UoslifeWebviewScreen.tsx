import React, {useEffect, useRef, useState} from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import {onMessageFromWebView} from '@uoslife/webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {getWebViewUserAgent} from 'react-native-user-agent';
import useUserState from '../hooks/useUserState';
import storage from '../storage';
import Spinner from '../components/atoms/spinner/Spinner';
import {RootNavigationProps} from '../navigators/RootStackNavigator';

type Props = {uri: string} & Omit<
  WebViewProps,
  'bounces' | 'source' | 'style' | 'ref' | 'onMessage' | 'userAgent' | 'onLoad'
>;

const UoslifeWebviewScreen = ({uri, ...props}: Props) => {
  const webviewRef = useRef<WebView | null>(null);
  const [loading, setLoading] = useState(true);
  const accessToken = storage.getString('accessToken');
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation<RootNavigationProps>();

  const {user} = useUserState();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setBarStyle('dark-content');
    }
  }, [isFocused]);

  const navigationGoBack = () => {
    navigation.goBack();
  };

  // userAgent
  const [userAgent, setUserAgent] = useState<string>('');
  useEffect(() => {
    (async () => {
      const res = await getWebViewUserAgent();
      setUserAgent(res);
    })();
  }, []);

  return (
    <>
      <View
        style={{height: insets.top, backgroundColor: 'rgba(0, 0, 0, 0.95)'}}
      />
      <WebView
        bounces={false}
        source={{uri}}
        style={{flex: 1}}
        ref={webviewRef}
        onMessage={e =>
          onMessageFromWebView({
            ...e,
            userPayload: user,
            accessTokenPayload: {accessToken},
            insetsPayload: insets,
            webviewRef,
            navigationGoBack,
          })
        }
        userAgent={userAgent}
        onLoad={() => setLoading(false)}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        {...props}
      />
      {loading ? <Spinner /> : null}
    </>
  );
};

export default UoslifeWebviewScreen;
