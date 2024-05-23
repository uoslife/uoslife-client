import {JWTTokenType} from '../api/services/account/type';
import storage from '../storage';

const storeToken = ({accessToken, refreshToken}: JWTTokenType) => {
  if (accessToken) storage.set('accessToken', accessToken);
  if (refreshToken) storage.set('refreshToken', refreshToken);
};
export default storeToken;
