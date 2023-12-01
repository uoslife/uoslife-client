import {AuthTokenDefaultRes} from '../api/services/core/auth/authAPI.type';
import storage from '../storage';

type StoreTokenType = Partial<AuthTokenDefaultRes>;

const storeToken = ({accessToken, refreshToken, tempToken}: StoreTokenType) => {
  if (accessToken) storage.set('accessToken', accessToken);
  if (refreshToken) storage.set('refreshToken', refreshToken);
  if (tempToken) storage.set('tempToken', tempToken);
};
export default storeToken;
