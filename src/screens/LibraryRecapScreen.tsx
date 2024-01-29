import {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import {onMessageFromWebView, useAndroidBackPress} from '@uoslife/webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import useUserState from '../hooks/useUserState';
import storage from '../storage';

const LibraryRecapScreen = () => {
  const webviewRef = useRef<WebView | null>(null);
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
  useAndroidBackPress(webviewRef);
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
      />
    </>
  );
};

export default LibraryRecapScreen;
