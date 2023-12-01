import {atomWithStorage, createJSONStorage} from 'jotai/utils';

import storage from '.';

const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

const setItem = <T>(key: string, value: T): void => {
  storage.set(key, JSON.stringify(value));
};

const removeItem = (key: string): void => {
  storage.delete(key);
};

const clearAll = (): void => {
  storage.clearAll();
};

const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    })),
  );

export default atomWithMMKV;
