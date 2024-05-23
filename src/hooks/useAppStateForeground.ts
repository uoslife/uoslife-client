import {useRef, useEffect} from 'react';
import {AppState} from 'react-native';

const useAppStateForeground = (callback: () => void) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callback();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [callback]);
};

export default useAppStateForeground;
