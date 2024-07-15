/* eslint-disable consistent-return */
import ky, {BeforeRetryHook} from 'ky';
import UserService from '../../services/user';
import {IErrorResponse} from '../services/type';
import {DEFAULT_API_RETRY_LIMIT} from '../../configs/api';

const handleToken: BeforeRetryHook = async ({error, retryCount}) => {
  const customError = error as IErrorResponse;
  if (customError.status !== 401) return ky.stop; // status code가 401이 아닌 경우 retry를 중지합니다.

  if (retryCount === DEFAULT_API_RETRY_LIMIT - 1) {
    await UserService.onLoginDurationExpired(); // access token을 2번 가져와도 실패한다면, 토큰 만료 로그아웃 시킵니다.
    return ky.stop;
  }
  await UserService.getAccessTokenByRefreshToken(); // refresh token을 이용하여 access token을 가져옵니다.
};

export default handleToken;
