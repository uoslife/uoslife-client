import {BeforeErrorHook} from 'ky';

export const beforeError: BeforeErrorHook = async error => {
  const {response} = error;
  const jsonRes = await response.json();
  return jsonRes;
};
