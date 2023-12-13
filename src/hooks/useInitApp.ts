import {useState, useEffect, useMemo} from 'react';
import {useSetAtom} from 'jotai';

import {Linking} from 'react-native';
import DeviceService from '../services/device';
import NotificationService from '../services/notification';
import UserService from '../services/user';
import storage from '../storage';
import {useConfigContext} from './ConfigContext';
import useUserState from './useUserState';
import bootSplashVisibleAtom from '../store/bootsplash';

const useInitApp = () => {
  const {config, isLoading, hasNetworkError} = useConfigContext();
  const isMaintenance = useMemo(
    () => config.get('app.block') !== 'NO',
    [config],
  );

  const setVisible = useSetAtom(bootSplashVisibleAtom);

  const [isServiceInitLoading, setIsServiceInitLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {setUserInfo} = useUserState();

  const setLoadingFinish = () => {
    setIsServiceInitLoading(false);
    storage.set('isNotFirstLoading', true);
  };

  const setAuthenticationSuccess = async () => {
    storage.set('isLoggedIn', true);
    setIsLoggedIn(true);
    setLoadingFinish();
  };

  useEffect(() => {
    (async () => {
      await NotificationService.requestNotificationPermissions();
      await NotificationService.handleFirebasePushToken();

      const hasRefreshToken = UserService.getHasRefreshToken();
      if (!hasRefreshToken) {
        setLoadingFinish();
        return;
      }

      const userInfo = await UserService.getUserInfoFromServer();
      if (!userInfo) {
        setLoadingFinish();
        return;
      }
      setUserInfo(userInfo);

      await DeviceService.updateDeviceInfo();
      setAuthenticationSuccess();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** hide splash screen if loading finish */
  useEffect(() => {
    if (isLoading || isServiceInitLoading) return;
    setVisible(true);
  }, [isLoading, isServiceInitLoading, setVisible]);

  /** 백그라운드에서 deepLink가 포함된 알림을 클릭하여 들어왔을 때 */
  useEffect(() => {
    if (!isLoggedIn || isLoading || isServiceInitLoading) return;
    (async () => {
      const openedDeepLinkUrl = storage.getString('openedDeepLinkUrl');
      if (openedDeepLinkUrl) {
        await Linking.openURL(openedDeepLinkUrl);
        storage.delete('openedDeepLinkUrl');
      }
    })();
  }, [isLoading, isLoggedIn, isServiceInitLoading]);

  return {
    hasNetworkError,
    isMaintenance,
    isLoggedIn,
    setIsLoggedIn,
    isLoading: isLoading || isServiceInitLoading,
    setLoadingFinish,
  };
};

export default useInitApp;
