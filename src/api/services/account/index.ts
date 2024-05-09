/* eslint-disable import/prefer-default-export */
import AuthAPI from './auth/authAPI';
import UserAPI from './user/userAPI';
import verificationAPI from './verification/verificationAPI';

export const AccountAPI = {
  ...AuthAPI,
  ...UserAPI,
  ...verificationAPI,
};
