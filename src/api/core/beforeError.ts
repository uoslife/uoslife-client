import {BeforeErrorHook} from 'ky';

const beforeError: BeforeErrorHook = async error => {
  const {response} = error;
  if (response.status === 401) {
    const jsonRes = await response.json();
    return jsonRes;
  }
  return error;
};
export default beforeError;
