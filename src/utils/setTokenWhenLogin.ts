import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e: any) {
    console.error(e.message);
  }
};

const setTokenWhenLogin = (accessToken: string, refreshToken: string) => {
  storeData('access_token', accessToken);
  storeData('refresh_token', refreshToken);
};
export default setTokenWhenLogin;
