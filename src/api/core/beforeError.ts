import {BeforeErrorHook} from 'ky';

const beforeError: BeforeErrorHook = async error => {
  const {response} = error;
  const jsonRes = await response.json();
  return jsonRes;
};
export default beforeError;
