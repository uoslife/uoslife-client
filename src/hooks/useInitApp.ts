import {useState, useEffect, useMemo, useCallback} from 'react';
import SplashScreen from 'react-native-bootsplash';
import DeviceService from '../services/device';
import NotificationService from '../services/notification';
import UserService from '../services/user';
import storage from '../storage';
import {useConfigContext} from './ConfigContext';
import useUserState from './useUserState';

const useInitApp = () => {
  const {config, isLoading, hasNetworkError} = useConfigContext();
  const isMaintenance = useMemo(
    () => config.get('app.block') !== 'NO',
    [config],
  );

  const [isServiceInitLoading, setIsServiceInitLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {setUserInfo} = useUserState();

  const setLoadingFinish = () => {
    setIsServiceInitLoading(false);
    storage.set('isNotFirstLoading', true);
  };

  const setAuthenticationSuccess = () => {
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
    (async () => await SplashScreen.hide())();
  }, [isLoading, isServiceInitLoading]);

  return {
    hasNetworkError,
    isMaintenance,
    isLoggedIn,
    setIsLoggedIn,
  };
};

export default useInitApp;
