import {storage} from '../storage';

const storeToken = (accessToken: string, refreshToken: string) => {
  if (!accessToken && !refreshToken) return;
  storage.set('access_token', accessToken);
  storage.set('refresh_token', refreshToken ?? '');
};
export default storeToken;
