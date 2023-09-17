import ky, {BeforeRequestHook} from 'ky';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.log(e.message);
  }
};

export const setAuthorizationHeader: BeforeRequestHook = (
  request,
  _options,
) => {
  const accessToken = getData('access_token');
  if (accessToken)
    request.headers.set('Authorization', `Bearer ${accessToken}`);
};
