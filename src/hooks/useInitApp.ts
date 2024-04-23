import {useState, useEffect, useMemo, useCallback} from 'react';
import {Alert, Linking} from 'react-native';
import {useAtom, useSetAtom} from 'jotai';
import CodePush, {
  DownloadProgress,
  LocalPackage,
  RemotePackage,
} from 'react-native-code-push';

import DeviceService from '../services/device';
import NotificationService from '../services/notification';
import UserService from '../services/user';
import storage from '../storage';
import useUserState from './useUserState';
import bootSplashVisibleAtom from '../store/app/bootSplashVisible';
import initLoadingAtom from '../store/app/initLoading';
import syncProgressAtom from '../store/app/codepush';
import customShowToast from '../configs/toast';
import supabaseConfigAtom from '../store/app/supabaseConfig';
import openAppstore from '../utils/app/openAppstore';

const useInitApp = () => {
  const [{data: configData}] = useAtom(supabaseConfigAtom);
  const isMaintenance = useMemo(
    () => configData?.config?.get('app.block') !== 'NO',
    [configData],
  );

  const setAnimatedBootSplashVisible = useSetAtom(bootSplashVisibleAtom);
  const setInitLoadingFinish = useSetAtom(initLoadingAtom);

  const [isServiceInitLoading, setIsServiceInitLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {setUserInfo} = useUserState();

  // codepush
  const setSyncProgress = useSetAtom(syncProgressAtom);
  const [codePushPackage, setCodePushPackage] = useState<RemotePackage>();

  const checkForUpdateCodePush = useCallback(async () => {
    const update = await CodePush.checkForUpdate();
    if (!update) return;

    setSyncProgress(prev => {
      return {...prev, isUpdate: true};
    });
    setCodePushPackage(update);
  }, [setSyncProgress]);

  const updateCodepush = useCallback(
    async (update?: RemotePackage) => {
      if (!update) return;
      try {
        update
          .download((progress: DownloadProgress) =>
            setSyncProgress(prev => {
              return {...prev, syncProgress: progress};
            }),
          )
          .then((newPackage: LocalPackage) =>
            newPackage.install(CodePush.InstallMode.IMMEDIATE).then(() => {
              storage.set('isSuccessCodePushUpdate', true);
              CodePush.notifyAppReady();
              CodePush.restartApp();
            }),
          )
          .finally(() =>
            setSyncProgress(prev => {
              return {...prev, isUpdate: false};
            }),
          );
      } catch {
        setSyncProgress(prev => {
          return {...prev, isUpdate: false};
        });
      }
    },
    [setSyncProgress],
  );

  // loading
  const setLoadingFinish = useCallback(() => {
    if (!configData?.isLatestVersion) {
      if (configData?.environment === 'alpha') {
        Alert.alert(
          '새로운 버전이 출시되었어요.(Alpha Environment)',
          `iOS: testflight에서 앱을 업데이트 해주세요.\nAndroid: Playstore 내부 테스트에서 앱을 업데이트 해주세요.`,
        );
        return;
      }
      Alert.alert(
        '알림',
        `새로운 버전이 출시되었어요.\n 업데이트를 위해 앱 스토어로 이동합니다.`,
        [
          {
            text: '이동하기',
            onPress: openAppstore,
          },
        ],
      );
      return;
    }
    checkForUpdateCodePush().finally(() => {
      setIsServiceInitLoading(false);
      storage.set('isNotFirstLoading', true);
      if (configData?.environment === 'alpha')
        customShowToast('alphaEnvironmentInfo');
    });
  }, [checkForUpdateCodePush, configData]);

  const setAuthenticationSuccess = useCallback(async () => {
    storage.set('isLoggedIn', true);
    setLoadingFinish();
  }, [setLoadingFinish]);

  // initialize App
  const initApp = useCallback(async () => {
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
  }, [setAuthenticationSuccess, setLoadingFinish, setUserInfo]);

  const isLoadingFinish = useMemo(
    () => configData?.isLoading || isServiceInitLoading,
    [configData?.isLoading, isServiceInitLoading],
  );

  useEffect(() => {
    if (!configData) return;
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configData]);

  /** 로딩이 끝났을 경우, AnimatedBootSplashScreen을 보여줍니다.
   * ```animatedBootSplashVisible: true```
   * */
  useEffect(() => {
    if (isLoadingFinish) return;
    setInitLoadingFinish(true);

    // codePush 업데이트 완료 후 재시작 하는경우, bootSplash를 보여주지 않습니다.
    if (storage.getBoolean('isSuccessCodePushUpdate')) {
      storage.set('isSuccessCodePushUpdate', false);
      return;
    }

    setAnimatedBootSplashVisible(true);
    updateCodepush(codePushPackage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServiceInitLoading]);

  /** 백그라운드에서 deepLink가 포함된 알림을 클릭하여 들어왔을 때 deeplink를 엽니다. */
  useEffect(() => {
    if (!isLoggedIn || isLoadingFinish) return;
    (async () => {
      const openedDeepLinkUrl = storage.getString('openedDeepLinkUrl');
      if (openedDeepLinkUrl) {
        await Linking.openURL(openedDeepLinkUrl);
        storage.delete('openedDeepLinkUrl');
      }
    })();
  }, [isLoadingFinish, isLoggedIn, isServiceInitLoading]);

  return {
    hasNetworkError: configData?.hasNetworkError,
    isMaintenance,
    isLoggedIn,
    setIsLoggedIn,
  };
};

export default useInitApp;
