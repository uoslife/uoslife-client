import {useMMKVListener} from 'react-native-mmkv';
import storage from '../storage';

/** isLoggedIn value를 감시합니다. */
const useIsLoggedInListner = (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useMMKVListener(changedKey => {
    if (changedKey !== 'isLoggedIn') return;
    setIsLoggedIn(storage.getBoolean(changedKey) ?? false);
  }, storage);
};

export default useIsLoggedInListner;
