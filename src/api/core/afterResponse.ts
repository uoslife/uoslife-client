import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import setTokenWhenLogin from '../../utils/setTokenWhenLogin';

const isDev = process.env.NODE_ENV !== 'production';

export const logging: AfterResponseHook = (request, _options, response) => {
  if (isDev) console.log(response);
  return ky(request);
};

export const handleToken: AfterResponseHook = async (
  request,
  _options,
  response,
) => {
  if (response.status !== 401) return ky(request);
  const res = await CoreAPI.getRefreshToken({});
  if (res.statusCode === 401) {
    // TODO: 로그인 초기화시키는 로직 추가
    return ky(request);
  }
  setTokenWhenLogin(res.accessToken, res.refreshToken);
  return ky(request);
};
