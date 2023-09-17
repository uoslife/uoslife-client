import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import setTokenWhenLogin from '../../utils/setTokenWhenLogin';
import {getData, removeData} from './beforeRequest';

export const handleToken: AfterResponseHook = async (
  request,
  _options,
  response,
) => {
  const accessToken = await getData('access_token');
  if (
    response.status !== 401 ||
    !accessToken ||
    request.url.includes('refresh')
  )
    return response;

  try {
    const res = await CoreAPI.getRefreshToken({});
    if (res.statusCode === 201) {
      setTokenWhenLogin(res.accessToken, res.refreshToken);
      return ky(request);
    }
  } catch (error) {
    await removeData('access_token');
    await removeData('refresh_token');
    // await CoreAPI.logout({});
    return response;
  }
};
