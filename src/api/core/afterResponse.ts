import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import setTokenWhenLogin from '../../utils/setTokenWhenLogin';

export const handleToken: AfterResponseHook = async (
  request,
  _options,
  response,
) => {
  const jsonRes = await response.json();
  const blob = new Blob([JSON.stringify(jsonRes, null, 2)]);
  if (response.status !== 401)
    return new Response(blob, {status: jsonRes.status});
  const res = await CoreAPI.getRefreshToken({});
  if (res.statusCode === 201) {
    setTokenWhenLogin(res.accessToken, res.refreshToken);
    return ky(request);
  }
  await CoreAPI.logout({});
  return ky(request);
};
