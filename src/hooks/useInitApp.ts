import {useEffect, useCallback} from 'react';
import {useAtom, useSetAtom} from 'jotai';
import CodePush, {
  DownloadProgress,
  LocalPackage,
  RemotePackage,
} from 'react-native-code-push';

import {captureException} from '@sentry/react-native';
import NotificationService from '../services/notification';
import UserService from '../services/user';
import storage from '../storage';
import useUserState from './useUserState';
import bootSplashVisibleAtom from '../store/app/bootSplashVisible';
import initLoadingAtom from '../store/app/initLoading';
import syncProgressAtom from '../store/app/codepush';
import customShowToast from '../configs/toast';
import {SupabaseConfigAtomType} from '../store/app/supabaseConfig';
import {guideUpdate} from '../utils/app/guideUpdate';
import {handleFCMTokenBackground} from '../utils/app/handleFCMTokenBackground';

type Props = {
  isFetching: boolean;
  configData?: SupabaseConfigAtomType;
};

const useInitApp = ({configData, isFetching}: Props) => {
  const setSplashScreenVisible = useSetAtom(bootSplashVisibleAtom);
  const [isInitLoadingFinish, setInitLoadingFinish] = useAtom(initLoadingAtom);

  const {setUserInfo} = useUserState();

  // codepush
  const setSyncProgress = useSetAtom(syncProgressAtom);

  const updateCodepush = useCallback(
    async (update: RemotePackage | null) => {
      if (!update) return;
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
        .catch(() => {
          setSyncProgress(prev => {
            return {...prev, isUpdate: false};
          });
        })
        .finally(() =>
          setSyncProgress(prev => {
            return {...prev, isUpdate: false};
          }),
        );
    },
    [setSyncProgress],
  );

  /** loading이 끝났을 때 동작 */
  const handleLoadingFinish = async ({isLogin}: {isLogin?: boolean}) => {
    if (isLogin) storage.set('isLoggedIn', true);

    // codepush 업데이트 확인 후, 있으면 업데이트
    try {
      const codePushPackage = await CodePush.checkForUpdate();
      if (codePushPackage) {
        setSyncProgress(prev => {
          return {...prev, isUpdate: true};
        });
        setSplashScreenVisible(true);
        updateCodepush(codePushPackage);
      }
    } catch (error) {
      captureException(error);
    }
    setInitLoadingFinish(true);
    storage.set('isNotFirstLoading', true); // android 환경에서 알림 권한 거부한 유저에게 계속해서 권한요청을 하지 않게하는 flag

    // alpha 환경인 경우 toast 알림
    if (configData?.environment === 'alpha')
      customShowToast('alphaEnvironmentInfo');

    // codePush 업데이트 완료 후 재시작 하는경우, bootSplash screen을 보여주지 않습니다.
    if (storage.getBoolean('isSuccessCodePushUpdate')) {
      storage.set('isSuccessCodePushUpdate', false);
      await handleFCMTokenBackground();
      return;
    }

    setSplashScreenVisible(true); // 로딩이 끝났을 경우, AnimatedBootSplashScreen을 보여줍니다.
    await handleFCMTokenBackground();
  };

  const initApp = async () => {
    // supabase로부터 최신 버전 여부 확인
    if (configData && !configData.isLatestVersion) {
      guideUpdate(configData?.environment);
      return;
    }
    // 알림 권한 요청
    await NotificationService.requestNotificationPermissions();

    // refresh token이 없는 경우
    if (!UserService.getHasRefreshToken()) {
      handleLoadingFinish({isLogin: false});
      return;
    }
    // 로그인 된 유저인지 검증
    try {
      await UserService.getAccessTokenByRefreshToken();
      const userInfo = await UserService.getUserInfoFromServer();
      setUserInfo(userInfo);
    } catch (error) {
      // 에러 발생시 logging 후 logout처리
      captureException(error);
      await UserService.logoutByUnknownError();
      handleLoadingFinish({isLogin: false});
      return;
    }

    handleLoadingFinish({isLogin: true});
  };

  useEffect(() => {
    if (isInitLoadingFinish) return;
    if (isFetching) return;
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isInitLoadingFinish]);
};

export default useInitApp;
