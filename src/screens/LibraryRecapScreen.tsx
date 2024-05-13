import {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {onMessageFromWebView} from '@uoslife/webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, StatusBar, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/core';

import useUserState from '../hooks/useUserState';
import storage from '../storage';
import Spinner from '../components/atoms/spinner/Spinner';
import {getWebViewUserAgent} from 'react-native-user-agent';

const LibraryRecapScreen = () => {
  const webviewRef = useRef<WebView | null>(null);
  const [loading, setLoading] = useState(true);
  const accessToken = storage.getString('accessToken');
  const {user} = useUserState();

  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) StatusBar.setBarStyle('light-content');
    else StatusBar.setBarStyle('dark-content');
  }, [isFocused]);

  const navigationGoBack = () => {
    navigation.goBack();
  };
  // useAndroidBackPress(webviewRef);

  // userAgent
  const [userAgent, setUserAgent] = useState('');
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
        source={{uri: 'https://recap.uoslife.com'}}
        style={{flex: 1}}
        ref={webviewRef}
        onMessage={e =>
          onMessageFromWebView({
            ...e,
            userPayload: user,
            accessTokenPayload: {accessToken},
            webviewRef,
            navigationGoBack,
          })
        }
        userAgent={userAgent}
        onLoad={() => setLoading(false)}
      />
      {loading ? <Spinner /> : null}
    </>
  );
};

export default LibraryRecapScreen;
