import {useRef} from 'react';

const THROTTLE_DEFAULT_TIME = 1 * 1000;

const useThrottle = <T extends Function>(
  callback: T,
  throttleTime: number | undefined = THROTTLE_DEFAULT_TIME,
): (() => void) => {
  const timer = useRef<ReturnType<Date['valueOf']>>(0);

  return () => {
    const callbackExecutionTime = new Date().valueOf();

    if (callbackExecutionTime - timer.current < throttleTime) return;

    timer.current = callbackExecutionTime;
    callback();
  };
};

export default useThrottle;
