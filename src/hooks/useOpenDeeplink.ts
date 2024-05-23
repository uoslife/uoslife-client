/* eslint-disable import/prefer-default-export */
import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useAtomValue} from 'jotai';
import storage from '../storage';
import initLoadingFinishAtom from '../store/app/initLoading';

/** 백그라운드에서 deepLink가 포함된 알림을 클릭하여 들어왔을 때 deeplink를 엽니다. */
export const useOpenDeeplink = (isLoggedIn: boolean) => {
  const isInitLoadingFinish = useAtomValue(initLoadingFinishAtom);
  useEffect(() => {
    if (!isLoggedIn || !isInitLoadingFinish) return;
    (async () => {
      const openedDeepLinkUrl = storage.getString('openedDeepLinkUrl');
      if (openedDeepLinkUrl) {
        await Linking.openURL(openedDeepLinkUrl);
        storage.delete('openedDeepLinkUrl');
      }
    })();
  }, [isInitLoadingFinish, isLoggedIn]);
};
