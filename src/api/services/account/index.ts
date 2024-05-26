import AuthAPI from './auth/authAPI';
import UserAPI from './user/userAPI';
import DeviceAPI from './device/deviceAPI';
import IdentityAPI from './identity/identityAPI';
import verificationAPI from './verification/verificationAPI';

export const AccountAPI = {
  ...AuthAPI,
  ...UserAPI,
  ...DeviceAPI,
  ...IdentityAPI,
  ...verificationAPI,
};
