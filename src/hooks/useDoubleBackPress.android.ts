import {useState, useCallback, useEffect} from 'react';
import {ToastAndroid, BackHandler} from 'react-native';

const TOAST_ANDROID_SHOW_SEC = 2.5 * 1000;

export const useDoubleBackPress = () => {
  const [backClickCount, setBackClickCount] = useState<number>(0);
  const backAction = useCallback(() => {
    setTimeout(() => {
      setBackClickCount(0);
    }, TOAST_ANDROID_SHOW_SEC);

    if (backClickCount === 0) {
      setBackClickCount(backClickCount + 1);

      ToastAndroid.showWithGravity(
        '한번 더 누르면 앱이 종료돼요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (backClickCount === 1) {
      BackHandler.exitApp();
    }
    return true;
  }, [backClickCount]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backAction]);
};
