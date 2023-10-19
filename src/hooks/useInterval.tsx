import {useEffect, useRef} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

type Props = {
  onInterval: () => void;
  delay: number;
};

const useInterval = ({onInterval, delay}: Props) => {
  const savedOnInterval = useRef<() => void>(() => {});
  const navigation = useNavigation();
  const isFocusedScreen = useIsFocused();

  useEffect(() => {
    savedOnInterval.current = onInterval;
  }, [onInterval]);

  useEffect(() => {
    // useInterval을 적용하지 않은 다른 화면에서 앱을 껏다 켰을 때, interval 동작 방지.
    if (!isFocusedScreen) return;

    let intervalHandler: NodeJS.Timeout | null = null;
    const startInterval = () => {
      savedOnInterval.current(); // delay로 인한 interval 시작 전, 첫 onInterval 호출. (ex. 학생증qr)
      intervalHandler = setInterval(savedOnInterval.current, delay);
    };
    const stopInterval = () => {
      if (intervalHandler) clearInterval(intervalHandler);
    };

    // 다른 stack 스크린으로 전환 시, clearInterval.
    navigation.addListener('blur', stopInterval);

    // 컴포넌트 마운트 이후, 첫 interval 시작.
    startInterval();

    // cleanup function
    return () => {
      navigation.removeListener('blur', stopInterval);
      stopInterval(); // 컴포넌트 언마운트 이후, clearInterval.
    };
  }, [isFocusedScreen]);
};

export default useInterval;
