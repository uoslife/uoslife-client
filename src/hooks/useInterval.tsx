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
    // 학생증이 아닌 다른 화면에서 앱을 껏다 켰을 때, interval 동작 방지.
    if (!isFocusedScreen) return;

    let intervalId: NodeJS.Timeout | null = null;
    const startInterval = () => {
      savedOnInterval.current(); // interval 시작 전, 첫 학생증 호출.
      intervalId = setInterval(savedOnInterval.current, delay);
    };
    const stopInterval = () => {
      if (intervalId) clearInterval(intervalId);
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
