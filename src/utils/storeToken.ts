import storage from '../storage';

const storeToken = (accessToken: string, refreshToken: string) => {
  if (!accessToken && !refreshToken) return;
  storage.set('accessToken', accessToken);
  storage.set('refreshToken', refreshToken ?? '');
};
export default storeToken;
