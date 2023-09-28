import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import storeToken from '../../utils/storeToken';
import {storage} from '../../storage';

export const handleToken: AfterResponseHook = async (
  request,
  _options,
  response,
) => {
  const accessToken = storage.getString('access_token');
  if (
    response.status !== 401 ||
    !accessToken ||
    request.url.includes('refresh')
  )
    return response;

  try {
    const res = await CoreAPI.getRefreshToken({});
    if (res.statusCode === 201) {
      storeToken(res.accessToken, res.refreshToken);
      return ky(request);
    }
  } catch (error) {
    storage.delete('access_token');
    storage.delete('refresh_token');
    // await CoreAPI.logout({});
    return response;
  }
};
